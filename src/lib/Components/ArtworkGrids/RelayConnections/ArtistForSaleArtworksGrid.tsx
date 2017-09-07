import { createPaginationContainer, graphql } from "react-relay"
import InfiniteScrollArtworksGrid, { PageSize } from "../InfiniteScrollGrid"

import Artwork from "../Artwork"
// tslint:disable-next-line:no-unused-expression
// This is so that TypeScript won’t remove the seemingly unused `Artwork` import. Relay depends on it to exist.
Artwork

const ArtistForSaleArtworksGrid = createPaginationContainer(
  InfiniteScrollArtworksGrid,
  {
    artist: graphql.experimental`
      fragment ArtistForSaleArtworksGrid_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          filter: { type: "[ArtistArtworksFilters]", defaultValue: [IS_FOR_SALE] }
        ) {
        __id
        forSaleArtworks: artworks_connection(
          first: $count
          after: $cursor
          filter: $filter
          sort: partner_updated_at_desc
        ) @connection(key: "ArtistForSaleArtworksGrid_forSaleArtworks") {
          pageInfo {
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            node {
              __id
              image {
                aspect_ratio
              }
              ...Artwork_artwork
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.artist && props.artist.forSaleArtworks
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, { filter }) {
      return {
        __id: props.artist.__id,
        count,
        cursor,
        filter,
      }
    },
    query: graphql.experimental`
      query ArtistForSaleArtworksGridQuery(
        $__id: ID!
        $count: Int!
        $cursor: String
        $filter: [ArtistArtworksFilters]
      ) {
        node(__id: $__id) {
          ... on Artist {
            ...ArtistForSaleArtworksGrid_artist @arguments(count: $count, cursor: $cursor, filter: $filter)
          }
        }
      }
    `,
  }
)

export default ArtistForSaleArtworksGrid

export interface ArtistRelayProps {
  artist: {
    artworks_connection: {
      pageInfo: {
        hasNextPage: boolean
      }
      edges: Array<{
        node: {
          __id: string
          image: {
            aspect_ratio: number | null
          } | null
        } | null
      }>
    } | null
  }
}
