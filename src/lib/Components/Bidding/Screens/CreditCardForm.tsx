import { Fonts } from "lib/data/fonts"
import React, { Component } from "react"
import { NavigatorIOS, ScrollView, StyleSheet, View } from "react-native"
import stripe, { PaymentCardTextField } from "tipsi-stripe"
import { BiddingThemeProvider } from "../Components/BiddingThemeProvider"
import { Button } from "../Components/Button"
import { Container } from "../Components/Containers"
import { Title } from "../Components/Title"
import { Flex } from "../Elements/Flex"
import { TextInput } from "../Elements/TextInput"
import { theme } from "../Elements/Theme"
import { Sans18 } from "../Elements/Typography"
import { PaymentCardTextFieldParams } from "./ConfirmFirstTimeBid"

interface CreditCardFormProps {
  navigator?: NavigatorIOS
  onSubmit: (p: PaymentCardTextFieldParams) => void
}

interface CreditCardFormState {
  valid: boolean
  params: PaymentCardTextFieldParams
}

const styles = StyleSheet.create({
  field: {
    fontFamily: Fonts.GaramondRegular,
    height: 40,
    fontSize: theme.fontSizes[3],
    width: "100%",
    borderColor: theme.colors.purple100,
    borderWidth: 1,
    borderRadius: 0,
    // margin: 20,
  },
})

export class CreditCardForm extends Component<CreditCardFormProps, CreditCardFormState> {
  // TODO: handle case where user already has a card and is changing it? fresh empty form?
  state = {
    valid: false,
    params: {
      number: null,
      expMonth: null,
      expYear: null,
      cvc: null,
    },
  }

  constructor(props) {
    super(props)
  }

  handleFieldParamsChange = (valid, params: PaymentCardTextFieldParams) => {
    this.setState({
      valid,
      params,
    })
    // console.log(`
    //   Valid: ${valid}
    //   Number: ${params.number || "-"}
    //   Month: ${params.expMonth || "-"}
    //   Year: ${params.expYear || "-"}
    //   CVC: ${params.cvc || "-"}
    // `)
  }

  onSubmit = () => {
    // console.log("Submitting:", this.state)
    if (this.state.valid) {
      this.props.onSubmit(this.state.params)
      this.props.navigator.pop()
    }
  }

  render() {
    return (
      <BiddingThemeProvider>
        <View>
          <Title>Your credit card</Title>

          <Flex m={4}>
            <PaymentCardTextField style={styles.field} onParamsChange={this.handleFieldParamsChange} />
            <Sans18>Valid: {String(this.state.valid)}</Sans18>
          </Flex>

          {/* <Flex m={4} flexDirection="row" border={1} borderColor="purple100" p={3} pb={2}>
            {big && <CardType type={this.state.cardType} /> }
            <TextInput
              placeholder="4242 4242 4242 4242"
              numberOfLines={1}
              keyboardType="number-pad"
              onChangeText={cardNumber => this.setState({ values: { ...this.state.values, cardNumber } })}
              pr={3}
              flexGrow={1}
              fontSize={3}
            />
            <TextInput
              placeholder="MM/YY"
              maxLength={5}
              numberOfLines={1}
              keyboardType="number-pad"
              onChangeText={expiry => this.setState({ values: { ...this.state.values, expiry } })}
              width={75}
              px={3}
              alignItems="flex-end"
              flexGrow={0}
              flexShrink={0}
              flexBasis="auto"
              fontSize={3}
            />
            <TextInput
              placeholder="CVV"
              maxLength={4}
              numberOfLines={1}
              keyboardType="number-pad"
              onChangeText={cvv => this.setState({ values: { ...this.state.values, cvv } })}
              width={63}
              px={3}
              alignItems="flex-end"
              flexGrow={0}
              flexShrink={0}
              flexBasis="auto"
              fontSize={3}
            />
          </Flex> */}
          <Button text="Add credit card" onPress={this.state.valid ? () => this.onSubmit() : null} />
        </View>
      </BiddingThemeProvider>
    )
  }
}
