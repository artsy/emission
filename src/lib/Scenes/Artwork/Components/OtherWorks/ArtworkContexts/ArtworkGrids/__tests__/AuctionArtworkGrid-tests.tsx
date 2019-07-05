import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { Header } from "../../../Header"
import { AuctionArtworkGrid } from "../AuctionArtworkGrid"

describe("AuctionArtworkGrid", () => {
  it("renders AuctionArtworkGrid with correct components", () => {
    const component = mount(<AuctionArtworkGrid artwork={ArtworkFixture} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works from Great Sale")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)
  })

  it("does not include grid when there are no artworks for the sale", () => {
    const artworkWithoutSaleArtworks = {
      ...ArtworkFixture,
      sale: {
        name: null,
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(<AuctionArtworkGrid artwork={artworkWithoutSaleArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
