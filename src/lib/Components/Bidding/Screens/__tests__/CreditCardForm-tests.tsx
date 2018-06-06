import React from "react"

// This didn't work
import babelRegister from "babel-register"
babelRegister({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false,
})
import { TextInput } from "react-native"
import * as renderer from "react-test-renderer"
import { PaymentCardTextField } from "tipsi-stripe"

import { Button } from "../../Components/Button"
import { Sans12 } from "../../Elements/Typography"
import { CreditCardForm } from "../CreditCardForm"

const onSubmitMock = jest.fn()

xit("renders properly", () => {
  const component = renderer.create(<CreditCardForm onSubmit={onSubmitMock} />).toJSON()
  expect(component).toMatchSnapshot()
})

xit("shows an error message for each field", () => {
  const component = renderer.create(<CreditCardForm onSubmit={onSubmitMock} />)

  component.root.findByType(Button).instance.props.onPress()

  // expect(errorTextComponent(component, "Full name").props.children).toEqual("This field is required")
})

it("calls the onSubmit() callback with valid credit card when ADD CREDIT CARD is tapped", () => {
  const component = renderer.create(<CreditCardForm onSubmit={onSubmitMock} navigator={{ pop: () => null } as any} />)

  const creditCardInput = creditCardCardFormComponent(component).findByType(TextInput)
  console.log(creditCardInput)
  creditCardInput.props.onChangeText("Yuki Stockmeier")
  component.root.findByType(Button).instance.props.onPress()

  expect(onSubmitMock).toHaveBeenCalledWith(null)
})

const creditCardCardFormComponent = component => component.findByType(PaymentCardTextField)
// const errorTextComponent = (component, label) => findFieldForInput(component, { label }).findByType(Sans12)

// const textInputComponent = (component, label) => findFieldForInput(component, { label }).findByType(TextInput)

// const findFieldForInput = (component, { label }) => component.root.findByProps({ label })

// const billingAddress = {
//   fullName: "Yuki Stockmeier",
//   addressLine1: "401 Broadway",
//   addressLine2: "25th floor",
//   city: "New York",
//   state: "NY",
//   postalCode: "10013",
// }
