import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import React from "react"
import { ArtworkContextAuctionFragmentContainer as ArtworkContextAuction } from "../ArtworkContextAuction"
import { ArtistArtworkGrid, AuctionArtworkGrid, RelatedArtworkGrid } from "../ArtworkGrids"

describe("ArtworkContextAuction", () => {
  it("renders ArtworkContextAuction and all expected grid components for an open auction", () => {
    const component = mount(<ArtworkContextAuction artwork={ArtworkFixture} isClosed={false} />)
    expect(component.find(AuctionArtworkGrid).length).toEqual(1)
    expect(component.find(ArtistArtworkGrid).length).toEqual(0)
    expect(component.find(RelatedArtworkGrid).length).toEqual(0)
  })

  it("renders ArtworkContextAuction and all expected grid components for a closed auction", () => {
    const component = mount(<ArtworkContextAuction artwork={ArtworkFixture} isClosed={true} />)
    expect(component.find(AuctionArtworkGrid).length).toEqual(0)
    expect(component.find(ArtistArtworkGrid).length).toEqual(1)
    expect(component.find(RelatedArtworkGrid).length).toEqual(1)
  })
})
