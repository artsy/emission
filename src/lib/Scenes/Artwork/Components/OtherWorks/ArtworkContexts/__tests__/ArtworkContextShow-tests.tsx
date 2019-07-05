import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import React from "react"
import { ArtworkContextShowFragmentContainer as ArtworkContextShow } from "../ArtworkContextShow"
import { ArtistArtworkGrid, PartnerArtworkGrid, RelatedArtworkGrid, ShowArtworkGrid } from "../ArtworkGrids"

describe("ArtworkContextShow", () => {
  it("renders ArtworkContextShow and all expected grid components", () => {
    const component = mount(<ArtworkContextShow artwork={ArtworkFixture} />)
    expect(component.find(PartnerArtworkGrid).length).toEqual(1)
    expect(component.find(ShowArtworkGrid).length).toEqual(1)
    expect(component.find(ArtistArtworkGrid).length).toEqual(1)
    expect(component.find(RelatedArtworkGrid).length).toEqual(1)
  })
})
