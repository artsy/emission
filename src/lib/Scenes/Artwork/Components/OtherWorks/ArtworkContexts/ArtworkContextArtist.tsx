import { ArtworkContextArtist_artwork } from "__generated__/ArtworkContextArtist_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ContextSectionsContainer } from "../ContextSectionsContainer"
import { ArtistArtworkGrid, PartnerArtworkGrid, RelatedArtworkGrid } from "./ArtworkGrids"

export const ArtworkContextArtistFragmentContainer = createFragmentContainer<{
  artwork: ArtworkContextArtist_artwork
}>(
  props => {
    return (
      <ContextSectionsContainer>
        <ArtistArtworkGrid artwork={props.artwork} />
        <PartnerArtworkGrid artwork={props.artwork} />
        <RelatedArtworkGrid artwork={props.artwork} />
      </ContextSectionsContainer>
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
