import { Box } from "@artsy/palette"
import { ShowArtworkGrid_artwork } from "__generated__/ShowArtworkGrid_artwork.graphql"
import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import _ from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextGridCTA } from "../../ContextGridCTA"
import { Header } from "../../Header"

interface ShowArtworkGridProps {
  artwork: ShowArtworkGrid_artwork
}

export class ShowArtworkGrid extends React.Component<ShowArtworkGridProps> {
  render() {
    const {
      artwork: { show },
    } = this.props

    if (!show) {
      return null
    }

    const artworks = show.artworksConnection.edges.map(({ node }) => node)
    if (_.isEmpty(artworks)) {
      return null
    }

    return (
      <>
        <Header title={`Other works from ${show.name}`} />
        <GenericGrid artworks={artworks} />
        <Box mt={2}>
          <ContextGridCTA href={show.href} label={`View all works from ${show.name}`} />
        </Box>
      </>
    )
  }
}

export const ShowArtworkGridFragmentContainer = createFragmentContainer(ShowArtworkGrid, {
  artwork: graphql`
    fragment ShowArtworkGrid_artwork on Artwork @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
      show {
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
