import { mount } from "enzyme"
import { ArtworkFixture } from "lib/__fixtures__/ArtworkFixture"
import React from "react"
import { ArtworkContextFairFragmentContainer as ArtworkContextFair } from "../ArtworkContextFair"
import { ArtistArtworkGrid, FairArtworkGrid, RelatedArtworkGrid, ShowArtworkGrid } from "../ArtworkGrids"

describe("ArtworkContextFair", () => {
  it("renders ArtworkContextFair and all expected grid components", () => {
    const component = mount(<ArtworkContextFair artwork={ArtworkFixture} />)
    expect(component.find(FairArtworkGrid).length).toEqual(1)
    expect(component.find(ShowArtworkGrid).length).toEqual(0)
    expect(component.find(ArtistArtworkGrid).length).toEqual(1)
    expect(component.find(RelatedArtworkGrid).length).toEqual(1)
  })
})
