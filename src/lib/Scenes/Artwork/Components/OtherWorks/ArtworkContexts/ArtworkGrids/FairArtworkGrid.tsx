import { Box } from "@artsy/palette"
import { FairArtworkGrid_artwork } from "__generated__/FairArtworkGrid_artwork.graphql"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import _ from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextGridCTA } from "../../ContextGridCTA"
import { Header } from "../../Header"

interface FairArtworkGridProps {
  artwork: FairArtworkGrid_artwork
}

export class FairArtworkGrid extends React.Component<FairArtworkGridProps> {
  render() {
    const {
      artwork: { fair },
    } = this.props

    if (!fair) {
      return null
    }

    const artworks = fair.artworksConnection.edges.map(({ node }) => node)
    if (_.isEmpty(artworks)) {
      return null
    }

    return (
      <>
        <Header title={"Other works from the booth"} />
        <GenericGrid artworks={artworks} />
        <Box mt={2}>
          <ContextGridCTA href={fair.href} label="View all works from the booth" />
        </Box>
      </>
    )
  }
}

export const FairArtworkGridFragmentContainer = createFragmentContainer(FairArtworkGrid, {
  artwork: graphql`
    fragment FairArtworkGrid_artwork on Artwork @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      fair: show(at_a_fair: true) {
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
