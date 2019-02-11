import { FilteredInfiniteScrollGrid } from "lib/Components/FilteredInfiniteScrollGrid"
import { MockRelayRenderer } from "lib/tests/MockRelayRenderer"
import { renderUntil } from "lib/tests/renderUntil"
import React from "react"
import { graphql } from "react-relay"
import { FairFixture } from "../../__fixtures__"
import { FairArtworksContainer as FairArtworks } from "../FairArtworks"

jest.unmock("react-relay")

it("renders properly", async () => {
  const tree = await renderUntil(
    wrapper => {
      return wrapper.find(FilteredInfiniteScrollGrid).length > 0
    },
    <MockRelayRenderer
      Component={FairArtworks}
      query={graphql`
        query FairArtworksTestsQuery {
          fair(id: "sofa-chicago-2018") {
            ...FairArtworks_fair
          }
        }
      `}
      mockResolvers={{
        Fair: () => FairFixture,
      }}
    />
  )

  expect(tree.html()).toMatchSnapshot()
})
