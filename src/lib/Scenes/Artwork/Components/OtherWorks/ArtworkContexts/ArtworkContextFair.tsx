import { ArtworkContextFair_artwork } from "__generated__/ArtworkContextFair_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextSectionsContainer } from "../ContextSectionsContainer"
import { ArtistArtworkGrid, FairArtworkGrid, RelatedArtworkGrid } from "./ArtworkGrids"

export const ArtworkContextFairFragmentContainer = createFragmentContainer<{ artwork: ArtworkContextFair_artwork }>(
  props => {
    return (
      <ContextSectionsContainer>
        <FairArtworkGrid artwork={props.artwork} />
        <ArtistArtworkGrid artwork={props.artwork} />
        <RelatedArtworkGrid artwork={props.artwork} />
      </ContextSectionsContainer>
    )
  },
  {
    artwork: graphql`
      fragment ArtworkContextFair_artwork on Artwork @argumentDefinitions(excludeArtworkIDs: { type: "[String!]" }) {
        ...FairArtworkGrid_artwork
        ...ArtistArtworkGrid_artwork
        ...RelatedArtworkGrid_artwork
      }
    `,
  }
)
