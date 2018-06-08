import React from "react"

import * as renderer from "react-test-renderer"
import { Button } from "../../Components/Button"
import { CreditCardForm } from "../CreditCardForm"

const onSubmitMock = jest.fn()

jest.mock("tipsi-stripe", () => {
  const MockTextInput = require("react-native").TextInput
  // const ReactInner = require("react")
  // const mockStripeCardField = () => ReactInner.createElement(TextInputInner)
  return { PaymentCardTextField: MockTextInput }
})

it("renders properly", () => {
  const component = renderer.create(<CreditCardForm onSubmit={onSubmitMock} />).toJSON()
  expect(component).toMatchSnapshot()
})

it("does not submit if the form is not valid", () => {
  const component = renderer.create(<CreditCardForm onSubmit={onSubmitMock} navigator={{ pop: () => null } as any} />)

  // FIXME: Testing implementation (state) instead of actually filling 3rd-party form component?
  component.root.instance.setState({
    valid: false,
    params: {
      number: "4242424242424242",
      expMonth: "01",
      expYear: "21",
      cvc: "420",
    },
  })

  // FIXME: Testing implementation (onPress) instead of actually tapping button?
  expect(component.root.findByType(Button).instance.props.onPress).toBeNull()
})

it("calls the onSubmit() callback with valid credit card when ADD CREDIT CARD is tapped", () => {
  const component = renderer.create(<CreditCardForm onSubmit={onSubmitMock} navigator={{ pop: () => null } as any} />)

  component.root.instance.setState({
    valid: true,
    params: {
      number: "4242424242424242",
      expMonth: "01",
      expYear: "21",
      cvc: "420",
    },
  })
  component.root.findByType(Button).instance.props.onPress()

  expect(onSubmitMock).toHaveBeenCalledWith({ cvc: "420", expMonth: "01", expYear: "21", number: "4242424242424242" })
})
