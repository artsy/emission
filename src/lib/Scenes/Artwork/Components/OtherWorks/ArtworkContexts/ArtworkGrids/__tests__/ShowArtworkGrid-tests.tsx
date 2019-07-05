import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { Header } from "../../../Header"
import { ShowArtworkGrid } from "../ShowArtworkGrid"

describe("ShowArtworkGrid", () => {
  it("renders ShowArtworkGrid with correct components", () => {
    const component = mount(<ShowArtworkGrid artwork={ArtworkFixture} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works from Great Show")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)
  })

  it("does not include grid when there are no artworks for the fair", () => {
    const artworkWithoutShowArtworks = {
      ...ArtworkFixture,
      show: {
        name: null,
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(<ShowArtworkGrid artwork={artworkWithoutShowArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
