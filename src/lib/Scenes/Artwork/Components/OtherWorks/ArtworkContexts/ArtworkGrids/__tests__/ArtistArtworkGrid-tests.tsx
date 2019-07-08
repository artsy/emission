import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { ContextGridCTA } from "../../../ContextGridCTA"
import { Header } from "../../../Header"
import { ArtistArtworkGrid } from "../ArtistArtworkGrid"
jest.mock("lib/NativeModules/SwitchBoard", () => ({
  presentNavigationViewController: jest.fn(),
}))

import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { TouchableWithoutFeedback } from "react-native"

describe("ArtistArtworkGrid", () => {
  it("renders ArtistArtworkGrid with correct components", () => {
    const artworkWithArtist = {
      ...ArtworkFixture,
      artist: {
        name: "Andy Warhol",
        href: "/artist/andy-warhol",
        artworks_connection: { ...ArtworkFixture.artist.artworks_connection },
      },
    }

    const component = mount(<ArtistArtworkGrid artwork={artworkWithArtist} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works by Andy Warhol")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)
    expect(component.find(ContextGridCTA).length).toEqual(1)
    expect(component.find(ContextGridCTA).text()).toContain("View all works by Andy Warhol")
    component
      .find(TouchableWithoutFeedback)
      .props()
      .onPress()
    expect(SwitchBoard.presentNavigationViewController).toHaveBeenCalledWith(expect.anything(), "/artist/andy-warhol")
  })

  it("does not include grid when there are no artworks for the artist", () => {
    const artworkWithoutPartnerArtworks = {
      ...ArtworkFixture,
      artist: {
        name: "Andy Warhol",
        href: "/artist/andy-warhol",
        artworks_connection: {
          edges: [],
        },
      },
    }
    const component = mount(<ArtistArtworkGrid artwork={artworkWithoutPartnerArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
