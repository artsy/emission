import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextAuction_artwork } from "__generated__/ArtworkContextAuction_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistArtworkGrid, AuctionArtworkGrid, RelatedArtworkGrid } from "./ArtworkGrids"

export const ArtworkContextAuctionFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextAuction_artwork
  isClosed: boolean
}>(
  props => {
    if (props.isClosed) {
      return (
        <Join separator={<Spacer my={2} />}>
          <ArtistArtworkGrid artwork={props.artwork} />
          <RelatedArtworkGrid artwork={props.artwork} />
        </Join>
      )
    } else {
      return (
        <Join separator={<Spacer my={2} />}>
          <AuctionArtworkGrid artwork={props.artwork} />
        </Join>
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
