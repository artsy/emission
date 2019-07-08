import { Box, Join, Separator } from "@artsy/palette"
import { ArtworkContextArtist_artwork } from "__generated__/ArtworkContextArtist_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistArtworkGrid, PartnerArtworkGrid, RelatedArtworkGrid } from "./ArtworkGrids"

export const ArtworkContextArtistFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextArtist_artwork
}>(
  props => {
    return (
      <Join
        separator={
          <Box my={3}>
            <Separator />
          </Box>
        }
      >
        <ArtistArtworkGrid artwork={props.artwork} />
        <PartnerArtworkGrid artwork={props.artwork} />
        <RelatedArtworkGrid artwork={props.artwork} />
      </Join>
    )
  },
  {
    artwork: graphql`
      fragment ArtworkContextArtist_artwork on Artwork {
        ...ArtistArtworkGrid_artwork
        ...PartnerArtworkGrid_artwork
        ...RelatedArtworkGrid_artwork
      }
    `,
  }
)
