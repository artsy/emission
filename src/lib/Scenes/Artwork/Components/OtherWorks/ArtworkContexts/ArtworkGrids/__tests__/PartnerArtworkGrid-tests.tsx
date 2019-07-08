import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import React from "react"
import { Header } from "../../../Header"
import { PartnerArtworkGrid } from "../PartnerArtworkGrid"
jest.mock("lib/NativeModules/SwitchBoard", () => ({
  presentNavigationViewController: jest.fn(),
}))

import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { TouchableWithoutFeedback } from "react-native"
import { ContextGridCTA } from "../../../ContextGridCTA"

describe("PartnerArtworkGrid", () => {
  it("renders PartnerArtworkGrid with correct components", () => {
    const artworkWithPartner = {
      ...ArtworkFixture,
      partner: {
        name: "Coolest Partner",
        href: "/partner/coolest-partner",
        artworksConnection: { ...ArtworkFixture.partner.artworksConnection },
      },
    }

    const component = mount(<PartnerArtworkGrid artwork={artworkWithPartner} />)
    expect(component.find(Header).length).toEqual(1)
    expect(
      component
        .find(Header)
        .at(0)
        .render()
        .text()
    ).toEqual("Other works from Coolest Partner")
    expect(component.find(GenericGrid).length).toEqual(1)
    expect(component.find(GenericGrid).props().artworks.length).toEqual(6)

    expect(component.find(ContextGridCTA).length).toEqual(1)
    expect(component.find(ContextGridCTA).text()).toContain("View all works from Coolest Partner")
    component
      .find(TouchableWithoutFeedback)
      .props()
      .onPress()
    expect(SwitchBoard.presentNavigationViewController).toHaveBeenCalledWith(
      expect.anything(),
      "/partner/coolest-partner"
    )
  })

  it("does not include grid when there are no artworks", () => {
    const artworkWithoutPartnerArtworks = {
      ...ArtworkFixture,
      partner: {
        name: "CAMA Gallery",
        href: "/partner/cama-gallery",
        artworksConnection: {
          edges: [],
        },
      },
    }
    const component = mount(<PartnerArtworkGrid artwork={artworkWithoutPartnerArtworks} />)
    expect(component.text()).toEqual(null)
  })
})
