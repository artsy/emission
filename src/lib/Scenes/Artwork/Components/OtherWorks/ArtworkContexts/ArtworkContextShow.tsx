import { Join, Spacer } from "@artsy/palette"
import { ArtworkContextShow_artwork } from "__generated__/ArtworkContextShow_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistArtworkGrid, PartnerArtworkGrid, RelatedArtworkGrid, ShowArtworkGrid } from "./ArtworkGrids"

export const ArtworkContextShowFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextShow_artwork
}>(
  props => {
    return (
      <Join separator={<Spacer my={2} />}>
        <ShowArtworkGrid artwork={props.artwork} />
        <ArtistArtworkGrid artwork={props.artwork} />
        <PartnerArtworkGrid artwork={props.artwork} />
        <RelatedArtworkGrid artwork={props.artwork} />
      </Join>
    )
  },
  {
    artwork: graphql`
      fragment ArtworkContextShow_artwork on Artwork {
        ...ArtistArtworkGrid_artwork
        ...PartnerArtworkGrid_artwork
        ...RelatedArtworkGrid_artwork
        ...ShowArtworkGrid_artwork
      }
    `,
  }
)
