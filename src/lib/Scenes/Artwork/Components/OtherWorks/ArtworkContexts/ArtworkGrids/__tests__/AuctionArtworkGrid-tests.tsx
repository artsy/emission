import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { ContextGridCTA } from "../../../ContextGridCTA"
import { Header } from "../../../Header"
import { AuctionArtworkGrid } from "../AuctionArtworkGrid"
jest.mock("lib/NativeModules/SwitchBoard", () => ({
  presentNavigationViewController: jest.fn(),
}))

import SwitchBoard from "lib/NativeModules/SwitchBoard"

describe("AuctionArtworkGrid", () => {
  it("renders AuctionArtworkGrid with correct components", () => {
    const artworkWithSale = {
      ...ArtworkFixture,
      sale: {
        name: "Greatest Sale on Earth",
        href: "/sale/greatest-sale-on-earth",
        artworksConnection: { ...ArtworkFixture.sale.artworksConnection },
      },
    }

    const component = mount(<AuctionArtworkGrid artwork={artworkWithSale} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works from Greatest Sale on Earth")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)
    expect(component.find(ContextGridCTA).length).toEqual(1)
    expect(component.find(ContextGridCTA).text()).toContain("View all works from Greatest Sale on Earth")
    component
      .find(TouchableWithoutFeedback)
      .props()
      .onPress()
    expect(SwitchBoard.presentNavigationViewController).toHaveBeenCalledWith(
      expect.anything(),
      "/sale/greatest-sale-on-earth"
    )
  })

  it("does not include grid when there are no artworks for the sale", () => {
    const artworkWithoutSaleArtworks = {
      ...ArtworkFixture,
      sale: {
        name: null,
        href: null,
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(<AuctionArtworkGrid artwork={artworkWithoutSaleArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
