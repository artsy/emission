import { ArtworkContextAuction_artwork } from "__generated__/ArtworkContextAuction_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ContextSectionsContainer } from "../ContextSectionsContainer"
import { ArtistArtworkGrid, AuctionArtworkGrid, RelatedArtworkGrid } from "./ArtworkGrids"

export const ArtworkContextAuctionFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextAuction_artwork
  isClosed: boolean
}>(
  props => {
    if (props.isClosed) {
      return (
        <ContextSectionsContainer>
          <ArtistArtworkGrid artwork={props.artwork} />
          <RelatedArtworkGrid artwork={props.artwork} />
        </ContextSectionsContainer>
      )
    } else {
      return (
        <ContextSectionsContainer>
          <AuctionArtworkGrid artwork={props.artwork} />
        </ContextSectionsContainer>
      )
    }
  },
  {
    artwork: graphql`
      fragment ArtworkContextAuction_artwork on Artwork @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        ...AuctionArtworkGrid_artwork
        ...ArtistArtworkGrid_artwork
        ...RelatedArtworkGrid_artwork
      }
    `,
  }
)
