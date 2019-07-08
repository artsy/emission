import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { TouchableWithoutFeedback } from "react-native"
import { ContextGridCTA } from "../../../ContextGridCTA"
import { Header } from "../../../Header"
import { FairArtworkGrid } from "../FairArtworkGrid"
jest.mock("lib/NativeModules/SwitchBoard", () => ({
  presentNavigationViewController: jest.fn(),
}))

import SwitchBoard from "lib/NativeModules/SwitchBoard"

describe("FairArtworkGrid", () => {
  it("renders FairArtworkGrid with correct components", () => {
    const artworkWithFair = {
      ...ArtworkFixture,
      fair: {
        href: "/fair/miami-is-awesome",
        artworksConnection: { ...ArtworkFixture.fair.artworksConnection },
      },
    }

    const component = mount(<FairArtworkGrid artwork={artworkWithFair} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works from the booth")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)

    expect(component.find(ContextGridCTA).length).toEqual(1)
    expect(component.find(ContextGridCTA).text()).toContain("View all works from the booth")
    component
      .find(TouchableWithoutFeedback)
      .props()
      .onPress()
    expect(SwitchBoard.presentNavigationViewController).toHaveBeenCalledWith(
      expect.anything(),
      "/fair/miami-is-awesome"
    )
  })

  it("does not include grid when there are no artworks for the fair", () => {
    const artworkWithoutFairArtworks = {
      ...ArtworkFixture,
      fair: {
        href: "",
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(<FairArtworkGrid artwork={artworkWithoutFairArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
