import { Serif } from "@artsy/palette"
import { get, isEmpty } from "lodash"
import React from "react"
import { NativeModules, NavigatorIOS, View, ViewProperties } from "react-native"
import { commitMutation, createFragmentContainer, graphql, RelayPaginationProp } from "react-relay"
import stripe from "tipsi-stripe"

import { Schema, screenTrack } from "../../../utils/track"

import SwitchBoard from "lib/NativeModules/SwitchBoard"

import { Flex } from "../Elements/Flex"

import { Modal } from "lib/Components/Modal"
import { LinkText } from "../../Text/LinkText"
import { BiddingThemeProvider } from "../Components/BiddingThemeProvider"
import { Button } from "../Components/Button"
import { Checkbox } from "../Components/Checkbox"
import { Container } from "../Components/Containers"
import { PaymentInfo } from "../Components/PaymentInfo"
import { Timer } from "../Components/Timer"
import { Title } from "../Components/Title"
import { Address, PaymentCardTextFieldParams, StripeToken } from "../types"

import { Registration_me } from "__generated__/Registration_me.graphql"
import { Registration_sale } from "__generated__/Registration_sale.graphql"

import { RegistrationCreateBidderMutation } from "__generated__/RegistrationCreateBidderMutation.graphql"
import { RegistrationCreateCreditCardMutation } from "__generated__/RegistrationCreateCreditCardMutation.graphql"
import { RegistrationResult, RegistrationStatus } from "./RegistrationResult"

const Emission = NativeModules.Emission || {}

stripe.setOptions({ publishableKey: Emission.stripePublishableKey })

export interface RegistrationProps extends ViewProperties {
  sale: Registration_sale
  me: Registration_me
  relay?: RelayPaginationProp
  navigator?: NavigatorIOS
}

interface RegistrationState {
  billingAddress?: Address
  creditCardFormParams?: PaymentCardTextFieldParams
  creditCardToken?: StripeToken
  conditionsOfSaleChecked: boolean
  isLoading: boolean
  requiresPaymentInformation: boolean
  errorModalVisible: boolean
  errorModalDetailText: string
}

@screenTrack({
  context_screen: Schema.PageNames.BidFlowRegistration,
  context_screen_owner_type: null,
})
export class Registration extends React.Component<RegistrationProps, RegistrationState> {
  constructor(props) {
    super(props)

    const { has_credit_cards } = this.props.me
    const requiresPaymentInformation = !has_credit_cards

    this.state = {
      billingAddress: null,
      creditCardToken: null,
      creditCardFormParams: null,
      conditionsOfSaleChecked: false,
      requiresPaymentInformation,
      isLoading: false,
      errorModalVisible: false,
      errorModalDetailText: "",
    }
  }

  canCreateBidder() {
    const { billingAddress, creditCardToken, conditionsOfSaleChecked } = this.state

    if (this.state.requiresPaymentInformation) {
      return billingAddress && creditCardToken && conditionsOfSaleChecked
    } else {
      return conditionsOfSaleChecked
    }
  }

  onPressConditionsOfSale = () => {
    SwitchBoard.presentModalViewController(this, "/conditions-of-sale?present_modally=true")
  }

  onCreditCardAdded(token: StripeToken, params: PaymentCardTextFieldParams) {
    this.setState({ creditCardToken: token, creditCardFormParams: params })
  }

  onBillingAddressAdded(values: Address) {
    this.setState({ billingAddress: values })
  }

  conditionsOfSalePressed() {
    this.setState({ conditionsOfSaleChecked: !this.state.conditionsOfSaleChecked })
  }

  register() {
    this.setState({ isLoading: true })

    this.state.requiresPaymentInformation ? this.createCreditCardAndBidder() : this.createBidder()
  }

  async createCreditCardAndBidder() {
    const { billingAddress, creditCardFormParams } = this.state
    try {
      const token = await stripe.createTokenWithCard({
        ...creditCardFormParams,
        name: billingAddress.fullName,
        addressLine1: billingAddress.addressLine1,
        addressLine2: billingAddress.addressLine2,
        addressCity: billingAddress.city,
        addressState: billingAddress.state,
        addressZip: billingAddress.postalCode,
      })

      commitMutation<RegistrationCreateCreditCardMutation>(this.props.relay.environment, {
        onCompleted: (data, errors) => {
          if (data && get(data, "createCreditCard.creditCardOrError.creditCard")) {
            this.createBidder()
          } else {
            if (isEmpty(errors)) {
              const mutationError = data && get(data, "createCreditCard.creditCardOrError.mutationError")
              this.presentErrorModal(mutationError, mutationError.detail)
            } else {
              this.presentErrorModal(errors, null)
            }
          }
        },
        onError: error => {
          this.presentRegistrationError(error, RegistrationStatus.RegistrationStatusNetworkError)
        },
        mutation: graphql`
          mutation RegistrationCreateCreditCardMutation($input: CreditCardInput!) {
            createCreditCard(input: $input) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCard {
                    id
                    brand
                    name
                    last_digits
                    expiration_month
                    expiration_year
                  }
                }
                ... on CreditCardMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            token: token.tokenId,
          },
        },
      })
    } catch (error) {
      this.presentRegistrationError(error, RegistrationStatus.RegistrationStatusError)
    }
  }

  createBidder() {
    commitMutation<RegistrationCreateBidderMutation>(this.props.relay.environment, {
      onCompleted: (results, errors) =>
        isEmpty(errors)
          ? this.presentRegistrationSuccess(results)
          : this.presentRegistrationError(errors, RegistrationStatus.RegistrationStatusError),
      onError: error => {
        this.presentRegistrationError(error, RegistrationStatus.RegistrationStatusNetworkError)
      },
      mutation: graphql`
        mutation RegistrationCreateBidderMutation($input: CreateBidderInput!) {
          createBidder(input: $input) {
            bidder {
              id
              qualified_for_bidding
            }
          }
        }
      `,
      variables: { input: { sale_id: this.props.sale.id } },
    })
  }

  presentRegistrationSuccess({ createBidder }) {
    NativeModules.ARNotificationsManager.postNotificationName("ARAuctionArtworkRegistrationUpdated", {
      ARAuctionID: this.props.sale.id,
    })

    const qualifiedForBidding = createBidder.bidder.qualified_for_bidding
    if (qualifiedForBidding === true) {
      this.presentRegistrationResult(RegistrationStatus.RegistrationStatusComplete)
    } else {
      this.presentRegistrationResult(RegistrationStatus.RegistrationStatusPending)
    }
  }

  presentRegistrationError(error, status) {
    console.error("Registration.tsx", error)
    this.presentRegistrationResult(status)
  }

  presentRegistrationResult(status: RegistrationStatus) {
    this.props.navigator.push({
      component: RegistrationResult,
      title: "",
      passProps: {
        status,
      },
    })

    this.setState({ isLoading: false })
  }

  presentErrorModal(errors, mutationMessage) {
    console.error("Registration.tsx", errors)

    const errorMessage =
      mutationMessage || "There was a problem processing your information. Check your payment details and try again."
    this.setState({ errorModalVisible: true, errorModalDetailText: errorMessage, isLoading: false })
  }

  closeModal() {
    this.setState({ errorModalVisible: false })
  }

  render() {
    const { live_start_at, end_at, is_preview, start_at } = this.props.sale
    const { isLoading } = this.state

    return (
      <BiddingThemeProvider>
        <Container m={0}>
          <View>
            <Flex alignItems="center">
              <Title mb={3}>Register to bid</Title>
              <Timer liveStartsAt={live_start_at} endsAt={end_at} isPreview={is_preview} startsAt={start_at} />
              <Serif size="4t" weight="semibold" my={5} mx={6} textAlign="center">
                {this.props.sale.name}
              </Serif>
            </Flex>

            {this.state.requiresPaymentInformation && (
              <PaymentInfo
                navigator={isLoading ? ({ push: () => null } as any) : this.props.navigator}
                onCreditCardAdded={this.onCreditCardAdded.bind(this)}
                onBillingAddressAdded={this.onBillingAddressAdded.bind(this)}
                billingAddress={this.state.billingAddress}
                creditCardFormParams={this.state.creditCardFormParams}
                creditCardToken={this.state.creditCardToken}
              />
            )}

            <Modal
              visible={this.state.errorModalVisible}
              headerText="An error occurred"
              detailText={this.state.errorModalDetailText}
              closeModal={this.closeModal.bind(this)}
            />
          </View>

          <View>
            <Checkbox
              mb={4}
              justifyContent="center"
              onPress={() => this.conditionsOfSalePressed()}
              disabled={isLoading}
            >
              <Serif size="2" mt={2} color="black60">
                Agree to{" "}
                <LinkText onPress={isLoading ? null : this.onPressConditionsOfSale}>Conditions of Sale</LinkText>
              </Serif>
            </Checkbox>

            <Flex m={4}>
              <Button
                text="Complete registration"
                inProgress={isLoading}
                selected={isLoading}
                onPress={this.canCreateBidder() ? () => this.register() : null}
                disabled={!this.canCreateBidder()}
              />
            </Flex>
          </View>
        </Container>
      </BiddingThemeProvider>
    )
  }
}

export const RegistrationScreen = createFragmentContainer(Registration, {
  sale: graphql`
    fragment Registration_sale on Sale {
      id
      end_at
      is_preview
      live_start_at
      name
      start_at
    }
  `,
  me: graphql`
    fragment Registration_me on Me {
      has_credit_cards
    }
  `,
})
