import { shallow } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import React from "react"
import { ArtworkContextArtistFragmentContainer as ArtworkContextArtist } from "../OtherWorks/ArtworkContexts/ArtworkContextArtist"
import { ArtworkContextAuctionFragmentContainer as ArtworkContextAuction } from "../OtherWorks/ArtworkContexts/ArtworkContextAuction"
import { ArtworkContextFairFragmentContainer as ArtworkContextFair } from "../OtherWorks/ArtworkContexts/ArtworkContextFair"
import { ArtworkContextShowFragmentContainer as ArtworkContextShow } from "../OtherWorks/ArtworkContexts/ArtworkContextShow"
import { OtherWorksFragmentContainer as OtherWorks } from "../OtherWorks/index"

describe("OtherWorks", () => {
  it("renders ArtistArtworkGrid with empty context", () => {
    const regularArtwork = {
      ...ArtworkFixture,
      context: null,
    }
    const component = shallow(<OtherWorks artwork={regularArtwork} />)
    expect(component.find(ArtworkContextArtist).length).toEqual(1)
    const componentText = component
      .find(ArtworkContextArtist)
      .at(0)
      .render()
      .text()
    expect(componentText).toMatchInlineSnapshot(
      `"Other works by Abbas KiarostamiView all works by Abbas KiarostamiOther works from CAMA GalleryView all works from CAMA GalleryRelated Works"`
    )
  })

  it("renders ArtistArtworkGrid with correct components", () => {
    const regularArtwork = {
      ...ArtworkFixture,
      context: "ArtworkContextArtist",
    }
    const component = shallow(<OtherWorks artwork={regularArtwork} />)
    expect(component.find(ArtworkContextArtist).length).toEqual(1)
    const componentText = component
      .find(ArtworkContextArtist)
      .at(0)
      .render()
      .text()
    expect(componentText).toMatchInlineSnapshot(
      `"Other works by Abbas KiarostamiView all works by Abbas KiarostamiOther works from CAMA GalleryView all works from CAMA GalleryRelated Works"`
    )
  })

  it("renders ArtworkContextAuction with correct components for an open auction", () => {
    const artworkWithOpenAuction = {
      ...ArtworkFixture,
      context: { __typename: "ArtworkContextAuction" },
      sale: {
        is_closed: false,
        name: "Great Sale",
        href: "/sale/greatest-sale-on-earth",
        artworksConnection: { ...ArtworkFixture.sale.artworksConnection },
      },
    }
    const component = shallow(<OtherWorks artwork={artworkWithOpenAuction} />)
    expect(component.find(ArtworkContextAuction).length).toEqual(1)
    const componentText = component
      .find(ArtworkContextAuction)
      .at(0)
      .render()
      .text()
    expect(componentText).toMatchInlineSnapshot(`"Other works from Great SaleView all works from Great Sale"`)
  })

  it("renders ArtworkContextAuction with correct components for a closed auction", () => {
    const artworkWithClosedAuction = {
      ...ArtworkFixture,
      context: { __typename: "ArtworkContextAuction" },
      sale: {
        is_closed: true,
        name: "Great Sale",
        href: "/sale/greatest-sale-on-earth",
        artworksConnection: { ...ArtworkFixture.sale.artworksConnection },
      },
    }
    const component = shallow(<OtherWorks artwork={artworkWithClosedAuction} />)
    expect(component.find(ArtworkContextAuction).length).toEqual(1)
    const componentText = component
      .find(ArtworkContextAuction)
      .at(0)
      .render()
      .text()
    expect(componentText).toMatchInlineSnapshot(
      `"Other works by Abbas KiarostamiView all works by Abbas KiarostamiRelated Works"`
    )
  })

  it("renders ArtworkContextFair with correct components", () => {
    const regularArtwork = {
      ...ArtworkFixture,
      context: {
        __typename: "ArtworkContextFair",
      },
    }
    const component = shallow(<OtherWorks artwork={regularArtwork} />)
    expect(component.find(ArtworkContextFair).length).toEqual(1)
    const componentText = component
      .find(ArtworkContextFair)
      .at(0)
      .render()
      .text()
    expect(componentText).toMatchInlineSnapshot(
      `"Other works from the boothView all works from the boothOther works from Great ShowView all works from Great ShowOther works by Abbas KiarostamiView all works by Abbas KiarostamiRelated Works"`
    )
  })

  it("renders ArtworkContextShow with correct components", () => {
    const regularArtwork = {
      ...ArtworkFixture,
      context: {
        __typename: "ArtworkContextShow",
      },
    }
    const component = shallow(<OtherWorks artwork={regularArtwork} />)
    expect(component.find(ArtworkContextShow).length).toEqual(1)
    const componentText = component
      .find(ArtworkContextShow)
      .at(0)
      .render()
      .text()
    expect(componentText).toMatchInlineSnapshot(
      `"Other works from Great ShowView all works from Great ShowOther works by Abbas KiarostamiView all works by Abbas KiarostamiOther works from CAMA GalleryView all works from CAMA GalleryRelated Works"`
    )
  })
})
