import { OtherWorks_artwork } from "__generated__/OtherWorks_artwork.graphql"
import { OtherWorksQuery } from "__generated__/OtherWorksQuery.graphql"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkContextArtistFragmentContainer as ArtworkContextArtist } from "./ArtworkContexts/ArtworkContextArtist"
import { ArtworkContextAuctionFragmentContainer as ArtworkContextAuction } from "./ArtworkContexts/ArtworkContextAuction"
import { ArtworkContextFairFragmentContainer as ArtworkContextFair } from "./ArtworkContexts/ArtworkContextFair"
import { ArtworkContextShowFragmentContainer as ArtworkContextShow } from "./ArtworkContexts/ArtworkContextShow"

const OtherWorksFragmentContainer = createFragmentContainer<{ artwork: OtherWorks_artwork }>(
  props => {
    const contextType = props.artwork.context && props.artwork.context.__typename

    switch (contextType) {
      case "ArtworkContextAuction": {
        return <ArtworkContextAuction artwork={props.artwork} isClosed={props.artwork.sale.is_closed} />
      }
      case "ArtworkContextFair": {
        return <ArtworkContextFair artwork={props.artwork} />
      }
      case "ArtworkContextPartnerShow": {
        return <ArtworkContextShow artwork={props.artwork} />
      }
      default: {
        return <ArtworkContextArtist artwork={props.artwork} />
      }
    }
  },
  {
    artwork: graphql`
      fragment OtherWorks_artwork on Artwork {
        context {
          __typename
        }
        sale {
          is_closed
        }
        ...ArtworkContextArtist_artwork
        ...ArtworkContextFair_artwork
        ...ArtworkContextAuction_artwork
        ...ArtworkContextShow_artwork
      }
    `,
  }
)

export const OtherWorksRenderer: React.SFC<{ artworkID: string }> = ({ artworkID, ...others }) => {
  return (
    <QueryRenderer<OtherWorksQuery>
      environment={defaultEnvironment}
      query={graphql`
        query OtherWorksQuery($artworkID: String!, $excludeArtworkIds: [String!]) {
          artwork(id: $artworkID) {
            ...OtherWorks_artwork
          }
        }
      `}
      variables={{ artworkID, excludeArtworkIds: [artworkID] }}
      render={renderWithLoadProgress(OtherWorksFragmentContainer, others)}
    />
  )
}
