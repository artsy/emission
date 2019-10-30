import { PartnerArtwork_partner } from "__generated__/PartnerArtwork_partner.graphql"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import { renderRelayTree } from "lib/tests/renderRelayTree"
import React from "react"
import { graphql, RelayPaginationProp } from "react-relay"
import { PartnerArtworkFixture } from "../__fixtures__/PartnerArtwork-fixture"
import { PartnerArtworkFragmentContainer as PartnerArtwork } from "../PartnerArtwork"

jest.unmock("react-relay")

describe("PartnerArtwork", () => {
  it("Passes renders correctly", async () => {
    const tree = await renderRelayTree({
      Component: ({ partner }) => {
        return (
          <PartnerArtwork
            partner={partner as PartnerArtwork_partner}
            relay={{ environment: {} } as RelayPaginationProp}
          />
        )
      },
      query: graphql`
        query PartnerArtworkTestsQuery @raw_response_type {
          partner(id: "anderson-fine-art-gallery-flickinger-collection") {
            id
            artworks: artworksConnection(first: 10) {
              edges {
                node {
                  ...GenericGrid_artworks
                }
              }
            }
          }
        }
      `,
      mockData: {
        partner: PartnerArtworkFixture,
      },
    })

    const grid = tree.find(GenericGrid)
    expect(grid.props().artworks.length).toBe(10)
    expect(grid.length).toBe(1)
    expect(tree).toMatchSnapshot()
  })
})
