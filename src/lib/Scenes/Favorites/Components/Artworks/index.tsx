import React, { Component } from "react"
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay"
import styled from "styled-components/native"

import GenericGrid from "lib/Components/ArtworkGrids/GenericGrid"
import ZeroState from "lib/Components/States/ZeroState"
import { PAGE_SIZE } from "lib/data/constants"
import { isCloseToBottom } from "lib/utils/isCloseToBottom"

const Container = styled.ScrollView`
  padding: 20px;
  flex: 1;
`

interface Props extends RelayProps {
  relay?: RelayPaginationProp
  onDataFetching?: (loading: boolean) => void
}

export class SavedWorks extends Component<Props> {
  loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return
    }

    const updateState = (loading: boolean) => {
      this.setState({ fetchingMoreData: loading })
      if (this.props.onDataFetching) {
        this.props.onDataFetching(loading)
      }
    }

    updateState(true)
    this.props.relay.loadMore(PAGE_SIZE, error => {
      if (error) {
        // FIXME: Handle error
        console.error("Artworks/index.tsx", error.message)
      }
      updateState(false)
    })
  }

  render() {
    const artworks = this.props.me.saved_artworks.artworks_connection.edges.map(edge => edge.node)

    const EmptyState = (
      <ZeroState
        title="You haven’t followed any artists yet"
        subtitle="Follow artists to get notified about new works that have been added to Artsy."
      />
    )

    const Content = (
      <Container onScroll={isCloseToBottom(this.loadMore)} scrollEventThrottle={400}>
        <GenericGrid artworks={artworks} />
      </Container>
    )

    return artworks.length ? Content : EmptyState
  }
}

export default createPaginationContainer(
  SavedWorks,
  {
    me: graphql`
      fragment Artworks_me on Me
        @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String", defaultValue: "" }) {
        saved_artworks {
          artworks_connection(private: true, first: $count, after: $cursor)
            @connection(key: "GenericGrid_artworks_connection") {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                ...GenericGrid_artworks
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.me && props.me.saved_artworks.artworks_connection
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query ArtworksQuery($count: Int!, $cursor: String) {
        me {
          ...Artworks_me @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

interface RelayProps {
  me: {
    saved_artworks: {
      artworks_connection: {
        edges: Array<{
          node: any | null
        }> | null
      } | null
    } | null
  } | null
}
