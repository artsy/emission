import _ from "lodash"
import React from "react"
import { ScrollView } from "react-native"
import * as Yup from "yup"

import { Flex } from "../Elements/Flex"
import { Sans12, Serif16 } from "../Elements/Typography"

import { BiddingThemeProvider } from "../Components/BiddingThemeProvider"
import { Button } from "../Components/Button"
import { Container } from "../Components/Containers"
import { Input } from "../Components/Input"
import { Title } from "../Components/Title"

import { Address } from "./ConfirmFirstTimeBid"

interface BillingAddressProps {
  onSubmit?: (values: Address) => null
  billingAddress?: Address
}

interface BillingAddressState {
  values: Address
  errors: {
    fullName?: string
    addressLine1?: string
    addressLine2?: string
    city?: string
    state?: string
    postalCode?: string
  }
}

export class BillingAddress extends React.Component<BillingAddressProps, BillingAddressState> {
  private readonly validationSchema = Yup.object().shape({
    fullName: Yup.string().required("This field is required"),
    addressLine1: Yup.string().required("This field is required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    postalCode: Yup.string().required("This field is required"),
  })

  constructor(props) {
    super(props)

    this.state = {
      values: {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        ...this.props.billingAddress,
      },
      errors: {},
    }
  }

  onSubmit() {
    this.validationSchema
      .validate(this.state.values, { abortEarly: false })
      .catch(err => {
        const newState = _.fromPairs(err.inner.map(error => [error.path, error.errors[0]]))
        this.setState({ errors: newState })
      })
      .then(valid => valid && this.props.onSubmit(this.state.values))
  }

  // updateField = (name, text) => {
  //   const error = validatedField(name, text)
  //   this.setState({errors: { [name]: error}, values: {[name]: text} })
  // }

  render() {
    const { errors } = this.state

    return (
      <BiddingThemeProvider>
        <ScrollView>
          <Container>
            <Title mt={0} mb={6}>
              Your billing address
            </Title>

            <Serif16 mb={2}>Full name</Serif16>
            <StyledInput
              value={this.state.values.fullName}
              onChangeText={fullName => this.setState({ values: { ...this.state.values, fullName } })}
              placeholder="Enter your full name"
              error={errors.fullName}
            />

            <Serif16 mb={2}>Address line 1</Serif16>
            <StyledInput
              value={this.state.values.addressLine1}
              onChangeText={addressLine1 => this.setState({ values: { ...this.state.values, addressLine1 } })}
              placeholder="Enter your street address"
              error={errors.addressLine1}
            />

            <Serif16 mb={2}>Address line 2 (optional)</Serif16>
            <StyledInput
              value={this.state.values.addressLine2}
              onChangeText={addressLine2 => this.setState({ values: { ...this.state.values, addressLine2 } })}
              placeholder="Enter your apt, floor, suite, etc."
              error={errors.addressLine2}
            />

            <Serif16 mb={2}>City</Serif16>
            <StyledInput
              value={this.state.values.city}
              onChangeText={city => this.setState({ values: { ...this.state.values, city } })}
              placeholder="Enter city"
              error={errors.city}
            />

            <Serif16 mb={2}>State, Province, or Region</Serif16>
            <StyledInput
              value={this.state.values.state}
              onChangeText={state => this.setState({ values: { ...this.state.values, state } })}
              placeholder="Enter state, province, or region"
              error={errors.state}
            />

            <Serif16 mb={2}>Postal code</Serif16>
            <StyledInput
              value={this.state.values.postalCode}
              onChangeText={postalCode => this.setState({ values: { ...this.state.values, postalCode } })}
              placeholder="Enter your postal code"
              error={errors.postalCode}
            />

            <Button text="Add billing address" onPress={() => this.onSubmit()} />
          </Container>
        </ScrollView>
      </BiddingThemeProvider>
    )
  }
}

const StyledInput = ({ error, ...props }) => (
  <Flex mb={4}>
    <Input mb={3} error={Boolean(error)} {...props} />
    {error && <Sans12 color="red100">{error}</Sans12>}
  </Flex>
)
