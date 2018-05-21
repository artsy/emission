import { shallow } from "enzyme"
import React from "react"
import "react-native"

import * as renderer from "react-test-renderer"
import { BidResult } from "../BidResult"

const saleArtwork = {
  current_bid: {
    amount: "CHF10,000",
    cents: 1000000,
    display: "CHF 10,000",
  },
  sale: {
    live_start_at: "2022-01-01T12:00:00+00:00",
    end_at: "2022-01-01T12:00:00+00:00",
  },
}

describe("BidResult component", () => {
  Date.now = jest.fn(() => 1525983752116)
  it("renders winning screen properly", () => {
    jest.useFakeTimers()

    const bidResult = <BidResult winning status={"SUCCESS"} sale_artwork={saleArtwork} navigator={jest.fn() as any} />
    const bg = renderer.create(bidResult).toJSON()

    const component = shallow(bidResult)
    expect(component.find("Timer")).toHaveLength(1)

    expect(bg).toMatchSnapshot()
  })

  it("renders timer and error message when bid is low", () => {
    jest.useFakeTimers()
    const messageHeader = "Your bid wasn’t high enough"
    const messageDescriptionMd = `Another bidder placed a higher max bid or the same max bid before you did.  \
 Bid again to take the lead.`

    const bidResult = (
      <BidResult
        winning={false}
        sale_artwork={saleArtwork}
        status="ERROR_BID_LOW"
        message_header={messageHeader}
        message_description_md={messageDescriptionMd}
        navigator={jest.fn() as any}
      />
    )
    const bg = renderer.create(bidResult).toJSON()
    expect(bg).toMatchSnapshot()

    const component = shallow(bidResult)
    expect(component.find("Timer")).toHaveLength(1)
  })
  it("doesn't render timer when live bidding is started", () => {
    jest.useFakeTimers()
    const status = "ERROR_LIVE_BIDDING_STARTED"
    const messageHeader = "Live bidding has started"
    const messageDescriptionMd = `Sorry, your bid wasn’t received before live bidding started.\
 To continue bidding, please [join the live auction](http://live-staging.artsy.net/).`

    const bidResult = (
      <BidResult
        winning={false}
        sale_artwork={saleArtwork}
        status={status}
        message_header={messageHeader}
        message_description_md={messageDescriptionMd}
        navigator={jest.fn() as any}
      />
    )
    const bg = renderer.create(bidResult).toJSON()

    expect(bg).toMatchSnapshot()

    const component = shallow(bidResult)
    expect(component.find("Timer")).toHaveLength(0)
  })
})
