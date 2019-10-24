jest.mock("lib/Components/Bidding/Screens/ConfirmBid/PriceSummary", () => ({
  PriceSummary: () => null,
}))

import React from "react"
import "react-native"
import { NativeModules } from "react-native"
import * as renderer from "react-test-renderer"

import { Button } from "@artsy/palette"
import relay from "react-relay"
import { Checkbox } from "../Components/Checkbox"
import { MaxBidPicker } from "../Components/MaxBidPicker"
import { SelectMaxBid } from "../Screens/SelectMaxBid"
import { FakeNavigator } from "./Helpers/FakeNavigator"

jest.mock("lib/Components/Bidding/Screens/ConfirmBid/BidderPositionQuery", () => ({
  bidderPositionQuery: jest.fn(),
}))
import { bidderPositionQuery } from "lib/Components/Bidding/Screens/ConfirmBid/BidderPositionQuery"
import { Title } from "../Components/Title"

jest.mock("tipsi-stripe", () => ({
  setOptions: jest.fn(),
  paymentRequestWithCardForm: jest.fn(),
  createTokenWithCard: jest.fn(),
}))
import stripe from "tipsi-stripe"

import { Theme } from "@artsy/palette"
import { BidderPositionQueryResponse } from "__generated__/BidderPositionQuery.graphql"
import { waitUntil } from "lib/tests/waitUntil"

const commitMutationMock = (fn?: typeof relay.commitMutation) =>
  jest.fn<typeof relay.commitMutation, Parameters<typeof relay.commitMutation>>(fn as any)

const bidderPositionQueryMock = bidderPositionQuery as jest.Mock<any>
let fakeNavigator: FakeNavigator
let fakeRelay

jest.useFakeTimers()

const getTitleText = component => component.root.findByType(Title).props.children

beforeEach(() => {
  NativeModules.ARNotificationsManager = { postNotificationName: jest.fn() }
  fakeNavigator = new FakeNavigator()
  fakeRelay = {
    refetch: jest.fn(),
  }
})

it("allows bidders with a qualified credit card to bid", async () => {
  let screen = renderer.create(
    <Theme>
      <SelectMaxBid
        me={Me.qualifiedUser as any}
        sale_artwork={SaleArtwork as any}
        navigator={fakeNavigator as any}
        relay={fakeRelay as any}
      />
    </Theme>
  )

  screen.root.findByType(MaxBidPicker).instance.props.onValueChange(null, 2)
  screen.root.findAllByType(Button)[0].instance.props.onPress()

  screen = fakeNavigator.nextStep()
  expect(getTitleText(screen)).toEqual("Confirm your bid")

  bidderPositionQueryMock.mockReturnValueOnce(Promise.resolve(mockRequestResponses.pollingForBid.highestBidder))
  relay.commitMutation = commitMutationMock((_, { onCompleted }) => {
    onCompleted(mockRequestResponses.placingBid.bidAccepted, null)
    return null
  }) as any

  screen.root.findByType(Checkbox).instance.props.onPress()
  screen.root.findAllByType(Button)[1].instance.props.onPress()

  await waitUntil(() => fakeNavigator.stackSize() === 2)

  screen = fakeNavigator.nextStep()
  expect(getTitleText(screen)).toEqual("You’re the highest bidder")
})

it("allows bidders without a qualified credit card to register a card and bid", async () => {
  let screen = renderer.create(
    <Theme>
      <SelectMaxBid
        me={Me.unqualifiedUser as any}
        sale_artwork={SaleArtwork as any}
        navigator={fakeNavigator as any}
        relay={fakeRelay as any}
      />
    </Theme>
  )

  screen.root.findByType(MaxBidPicker).instance.props.onValueChange(null, 2)
  screen.root.findAllByType(Button)[0].instance.props.onPress()

  screen = fakeNavigator.nextStep()

  expect(getTitleText(screen)).toEqual("Confirm your bid")

  stripe.createTokenWithCard.mockReturnValueOnce(stripeToken)
  relay.commitMutation = jest
    .fn()
    .mockImplementationOnce((_, { onCompleted }) => onCompleted(mockRequestResponses.updateMyUserProfile))
    .mockImplementationOnce((_, { onCompleted }) => onCompleted(mockRequestResponses.creatingCreditCardSuccess))
    .mockImplementationOnce((_, { onCompleted }) => onCompleted(mockRequestResponses.placingBid.bidAccepted))
  bidderPositionQueryMock.mockReturnValueOnce(Promise.resolve(mockRequestResponses.pollingForBid.highestBidder))

  // manually setting state to avoid duplicating tests for skipping UI interaction, but practically better not to do this.
  screen.root.findByProps({ nextScreen: true }).instance.setState({
    billingAddress,
    creditCardFormParams,
    creditCardToken: {
      card: {
        brand: "visa",
        last4: "4242",
      },
    },
  })

  screen.root.findByType(Checkbox).instance.props.onPress()
  await screen.root.findAllByType(Button)[1].instance.props.onPress()

  expect(stripe.createTokenWithCard).toHaveBeenCalledWith({
    ...creditCardFormParams,
    name: billingAddress.fullName,
    addressLine1: billingAddress.addressLine1,
    addressLine2: billingAddress.addressLine2,
    addressCity: billingAddress.city,
    addressState: billingAddress.state,
    addressZip: billingAddress.postalCode,
    addressCountry: billingAddress.country.shortName,
  })

  screen = fakeNavigator.nextStep()

  expect(getTitleText(screen)).toEqual("You’re the highest bidder")
})

const stripeToken = {
  tokenId: "token-id",
  created: 1528817746,
  livemode: 10,
  card: {
    brand: "VISA",
    last4: "4242",
  },
}

const billingAddress = {
  fullName: "Yuki Stockmeier",
  addressLine1: "401 Broadway",
  addressLine2: "25th floor",
  city: "New York",
  state: "NY",
  postalCode: "10013",
  phoneNumber: "111 222 333",
  country: {
    longName: "United States",
    shortName: "US",
  },
}

const creditCardFormParams = {
  number: "4242424242424242",
  expMonth: "12",
  expYear: "2020",
  cvc: "314",
}

const Me = {
  qualifiedUser: {
    has_qualified_credit_cards: true,
  },
  unqualifiedUser: {
    has_qualified_credit_cards: false,
  },
}

const SaleArtwork = {
  internalID: "sale-artwork-id",
  artwork: {
    id: "meteor shower",
    title: "Meteor Shower",
    date: "2015",
    artist_names: "Makiko Kudo",
    image: {
      url: "https://d32dm0rphc51dk.cloudfront.net/5RvuM9YF68AyD8OgcdLw7g/small.jpg",
    },
  },
  sale: {
    id: "best-art-sale-in-town",
  },
  lot_label: "538",
  increments: [
    {
      display: "$35,000",
      cents: 3500000,
    },
    {
      display: "$40,000",
      cents: 4000000,
    },
    {
      display: "$45,000",
      cents: 4500000,
    },
  ],
}

const mockRequestResponses = {
  updateMyUserProfile: {},
  creatingCreditCardSuccess: {
    createCreditCard: {
      creditCardOrError: {
        creditCard: {
          id: "new-credit-card",
        },
      },
    },
  },
  placingBid: {
    bidAccepted: {
      createBidderPosition: {
        result: {
          status: "SUCCESS",
          position: { id: "some-bidder-position-id" },
        },
      },
    },
  },
  pollingForBid: {
    highestBidder: {
      me: {
        bidder_position: {
          status: "WINNING",
          position: {},
        },
      },
    } as BidderPositionQueryResponse,
  },
}
