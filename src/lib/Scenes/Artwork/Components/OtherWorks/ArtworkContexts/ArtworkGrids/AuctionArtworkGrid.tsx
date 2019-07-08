import { Box } from "@artsy/palette"
import { AuctionArtworkGrid_artwork } from "__generated__/AuctionArtworkGrid_artwork.graphql"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import _ from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextGridCTA } from "../../ContextGridCTA"
import { Header } from "../../Header"

interface AuctionArtworkGridProps {
  artwork: AuctionArtworkGrid_artwork
}

export class AuctionArtworkGrid extends React.Component<AuctionArtworkGridProps> {
  render() {
    const {
      artwork: { sale },
    } = this.props

    if (!sale) {
      return null
    }

    const artworks = sale.artworksConnection.edges.map(({ node }) => node)
    if (_.isEmpty(artworks)) {
      return null
    }

    return (
      <>
        <Header title={`Other works from ${sale.name}`} />
        <GenericGrid artworks={artworks} />
        <Box mt={2}>
          <ContextGridCTA href={sale.href} label={`View all works from ${sale.name}`} />
        </Box>
      </>
    )
  }
}

export const AuctionArtworkGridFragmentContainer = createFragmentContainer(AuctionArtworkGrid, {
  artwork: graphql`
    fragment AuctionArtworkGrid_artwork on Artwork @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      sale {
        name
        href
        artworksConnection(first: 6, exclude: $excludeArtworkIDs) {
          edges {
            node {
              ...GenericGrid_artworks
            }
          }
        }
      }
    }
  `,
})
