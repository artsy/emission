import React from "react"
import { Dimensions, FlatList, RefreshControl } from "react-native"
import { ConnectionData, createPaginationContainer, graphql, RelayPaginationProp } from "react-relay"
import styled from "styled-components/native"

import { PAGE_SIZE } from "lib/data/constants"

import ARSwitchBoard from "../../../NativeModules/SwitchBoard"
import Message from "./Message"
import ArtworkPreview from "./Preview/ArtworkPreview"
import ShowPreview from "./Preview/ShowPreview"

const isPad = Dimensions.get("window").width > 700

interface Props {
  conversation?: RelayProps["me"]["conversation"]
  relay?: RelayPaginationProp
  onDataFetching?: (loading: boolean) => void
  shouldShowSeparator?: (shouldShowSeparator: boolean) => void
}

interface State {
  fetchingMoreData: boolean
  reloadingData: boolean
  shouldStickFirstMessageToTop: boolean
}

const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 40px;
`

export class Messages extends React.Component<Props, State> {
  state = {
    fetchingMoreData: false,
    reloadingData: false,
    shouldStickFirstMessageToTop: false,
  }

  renderMessage({ item, index }) {
    const conversationItem = this.props.conversation.items[0].item
    const conversation = this.props.conversation
    const partnerName = conversation.to.name
    const senderName = item.is_from_user ? conversation.from.name : partnerName
    const initials = item.is_from_user ? conversation.from.initials : conversation.to.initials
    return (
      <Message
        index={index}
        firstMessage={item.first_message}
        initialText={conversation.initial_message}
        message={item}
        conversationId={conversation.id}
        senderName={senderName}
        initials={initials}
        artworkPreview={
          item.first_message &&
          conversationItem.__typename === "Artwork" && (
            <ArtworkPreview
              artwork={conversationItem}
              onSelected={() => ARSwitchBoard.presentNavigationViewController(this, conversationItem.href)}
            />
          )
        }
        showPreview={
          item.first_message &&
          conversationItem.__typename === "Show" && (
            <ShowPreview
              show={conversationItem}
              onSelected={() => ARSwitchBoard.presentNavigationViewController(this, conversationItem.href)}
            />
          )
        }
      />
    )
  }

  loadMore() {
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
        console.error("Messages.tsx", error.message)
      }
      updateState(false)
    })
  }

  reload() {
    const count = this.props.conversation.messages.edges.length
    this.setState({ reloadingData: true })
    this.props.relay.refetchConnection(count, error => {
      if (error) {
        // FIXME: Handle error
        console.error("Messages.tsx", error.message)
      }
      this.setState({ reloadingData: false })
    })
  }

  render() {
    const edges = (this.props.conversation.messages || { edges: [] }).edges
    const messageCount = edges.length
    const messages = edges.map((edge, index) => {
      const isFirstMessage = this.props.relay && !this.props.relay.hasMore() && index === messageCount - 1
      return { first_message: isFirstMessage, key: edge.cursor, ...edge.node }
    })
    const refreshControl = <RefreshControl refreshing={this.state.reloadingData} onRefresh={this.reload.bind(this)} />

    const messagesStyles = isPad
      ? {
          width: 708,
          alignSelf: "center",
        }
      : {}

    return (
      <FlatList
        inverted={!this.state.shouldStickFirstMessageToTop}
        data={this.state.shouldStickFirstMessageToTop ? messages.reverse() : messages}
        renderItem={this.renderMessage.bind(this)}
        keyExtractor={({ __id }) => __id}
        keyboardShouldPersistTaps="always"
        onEndReached={this.loadMore.bind(this)}
        onEndReachedThreshold={0.2}
        onContentSizeChange={(_width, height) => {
          // If there aren't enough items to scroll through
          // display messages from the top
          const windowHeight = Dimensions.get("window").height
          const containerHeight = windowHeight - 100
          const shouldStickFirstMessageToTop = height < containerHeight

          if (this.props.shouldShowSeparator) {
            this.props.shouldShowSeparator(!shouldStickFirstMessageToTop)
          }

          this.setState({
            shouldStickFirstMessageToTop,
          })
        }}
        refreshControl={refreshControl}
        style={messagesStyles}
        ListFooterComponent={<LoadingIndicator animating={this.state.fetchingMoreData} hidesWhenStopped />}
      />
    )
  }
}

export default createPaginationContainer(
  Messages,
  {
    conversation: graphql`
      fragment Messages_conversation on Conversation
        @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, after: { type: "String" }) {
        __id
        id
        from {
          name
          email
          initials
        }
        to {
          name
          initials
        }
        initial_message
        messages(first: $count, after: $after, sort: DESC) @connection(key: "Messages_messages", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
          edges {
            cursor
            node {
              __id
              impulse_id
              is_from_user
              body
              ...Message_message
            }
          }
        }
        items {
          item {
            ... on Artwork {
              __typename
              href
              ...ArtworkPreview_artwork
            }
            ... on Show {
              __typename
              href
              ...ShowPreview_show
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.conversation && (props.conversation.messages as ConnectionData)
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, paginationInfo, _fragmentVariables) {
      return {
        conversationID: props.conversation.id,
        count: paginationInfo.count,
        after: paginationInfo.cursor,
      }
    },
    query: graphql`
      query MessagesQuery($conversationID: String!, $count: Int!, $after: String) {
        me {
          conversation(id: $conversationID) {
            ...Messages_conversation @arguments(count: $count, after: $after)
          }
        }
      }
    `,
  }
)

interface RelayProps {
  me: {
    conversation: {
      id: string
      __id: string
      to: {
        name: string
        initials: string
      }
      from: {
        name: string
        email: string
        initials: string
      }
      initial_message: string
      messages: {
        pageInfo?: {
          hasNextPage: boolean
        }
        edges: Array<{
          cursor: string
          node: {
            __id: string
            impulse_id: string
            is_from_user: boolean
          } | null
        }>
      }
      items: Array<{
        item: any
      }>
    }
  }
}
