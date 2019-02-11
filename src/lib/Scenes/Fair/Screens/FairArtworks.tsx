import { Theme } from "@artsy/palette"
import { FairArtworks_fair } from "__generated__/FairArtworks_fair.graphql"
import { FairArtworksQuery } from "__generated__/FairArtworksQuery.graphql"
import { FilteredInfiniteScrollGrid } from "lib/Components/FilteredInfiniteScrollGrid"
import React from "react"
import { createRefetchContainer, graphql, QueryRenderer, RelayRefetchProp } from "react-relay"
import { defaultEnvironment } from "../../../relay/createEnvironment"
import renderWithLoadProgress from "../../../utils/renderWithLoadProgress"

interface Props {
  fair: FairArtworks_fair
  fairID: string
  relay: RelayRefetchProp
}

interface State {
  filters: {
    medium: string
    priceRange: string
  }
}

export class FairArtworks extends React.Component<Props, State> {
  handleRefetch = params => {
    const { fairID } = this.props
    this.props.relay.refetch({
      ...params,
      fairID,
    })
  }

  render() {
    const { fair } = this.props
    return (
      <Theme>
        <FilteredInfiniteScrollGrid filteredArtworks={fair.artworks} onRefetch={this.handleRefetch} />
      </Theme>
    )
  }
}

export const FairArtworksContainer = createRefetchContainer(
  FairArtworks,
  graphql`
    fragment FairArtworks_fair on Fair
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        price_range: { type: "String", defaultValue: "*-*" }
      ) {
      __id
      artworks: filteredArtworks(
        size: 0
        medium: $medium
        price_range: $price_range
        aggregations: [MEDIUM, PRICE_RANGE, TOTAL]
      ) {
        ...FilteredInfiniteScrollGrid_filteredArtworks
      }
    }
  `,
  graphql`
    query FairArtworksRefetchQuery($fairID: String!, $medium: String, $price_range: String) {
      fair(id: $fairID) {
        ...FairArtworks_fair @arguments(medium: $medium, price_range: $price_range)
      }
    }
  `
)

export const FairArtworksRenderer: React.SFC<{ fairID: string }> = ({ fairID }) => (
  <QueryRenderer<FairArtworksQuery>
    environment={defaultEnvironment}
    query={graphql`
      query FairArtworksQuery($fairID: String!) {
        fair(id: $fairID) {
          ...FairArtworks_fair
        }
      }
    `}
    variables={{ fairID }}
    render={renderWithLoadProgress(FairArtworksContainer)}
  />
)
