import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { Header } from "../../../Header"
import { ShowArtworkGrid } from "../ShowArtworkGrid"
jest.mock("lib/NativeModules/SwitchBoard", () => ({
  presentNavigationViewController: jest.fn(),
}))

import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { TouchableWithoutFeedback } from "react-native"
import { ContextGridCTA } from "../../../ContextGridCTA"

describe("ShowArtworkGrid", () => {
  it("renders ShowArtworkGrid with correct components", () => {
    const artworkWithShow = {
      ...ArtworkFixture,
      show: {
        name: "Greatest Show on Earth",
        href: "/show/greatest-show-on-earth",
        artworksConnection: { ...ArtworkFixture.show.artworksConnection },
      },
    }

    const component = mount(<ShowArtworkGrid artwork={artworkWithShow} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works from Greatest Show on Earth")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)

    expect(component.find(ContextGridCTA).length).toEqual(1)
    expect(component.find(ContextGridCTA).text()).toContain("View all works from Greatest Show on Earth")
    component
      .find(TouchableWithoutFeedback)
      .props()
      .onPress()
    expect(SwitchBoard.presentNavigationViewController).toHaveBeenCalledWith(
      expect.anything(),
      "/show/greatest-show-on-earth"
    )
  })

  it("does not include grid when there are no artworks for the fair", () => {
    const artworkWithoutShowArtworks = {
      ...ArtworkFixture,
      show: {
        name: null,
        href: null,
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(<ShowArtworkGrid artwork={artworkWithoutShowArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
