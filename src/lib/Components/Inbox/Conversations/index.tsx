import React, { Component } from "react"
import { ConnectionData, createPaginationContainer, graphql, RelayPaginationProp } from "react-relay"
import styled from "styled-components/native"

import { FlatList, View } from "react-native"
import { LargeHeadline } from "../Typography"

import { isCloseToBottom } from "lib/utils/isCloseToBottom"
import SwitchBoard from "../../../NativeModules/SwitchBoard"
import Spinner from "../../Spinner"
import ConversationSnippet, { Props as ConversationSnippetProps } from "./ConversationSnippet"

import { PAGE_SIZE } from "lib/data/constants"

const Headline = styled(LargeHeadline)`
  margin-top: 20px;
  margin-bottom: -10px;
`

interface Props extends RelayProps {
  relay?: RelayPaginationProp
  headerView?: JSX.Element
  onRefresh?: () => any
}

interface State {
  conversations: ConversationSnippetProps[] | null
}

export class Conversations extends Component<Props, State> {
  get conversations() {
    return this.getConversationsFrom(this.props.me)
  }

  componentWillMount() {
    this.setState({
      conversations: this.conversations,
    })
  }

  componentWillReceiveProps(newProps) {
    const conversations = this.getConversationsFrom(newProps.me)

    this.setState({
      conversations,
    })
  }

  getConversationsFrom(me) {
    let conversations = []

    if (me) {
      conversations = me.conversations.edges
        .filter(({ node }) => {
          return node && node.last_message
        })
        .map(edge => edge.node)
    }

    return conversations
  }

  fetchData = () => {
    const { relay } = this.props

    if (!relay.isLoading()) {
      relay.loadMore(PAGE_SIZE, error => {
        if (error) {
          console.error("Conversations/index.tsx #fetchData", error.message)
          // FIXME: Handle error
        }

        this.setState({
          conversations: this.conversations,
        })
      })
    }
  }

  refreshConversations = (callback: () => void) => {
    const { relay } = this.props

    if (!relay.isLoading()) {
      relay.refetchConnection(PAGE_SIZE, error => {
        if (error) {
          console.error("Conversations/index.tsx #refreshConversations", error.message)
          // FIXME: Handle error
        }

        if (callback) {
          callback()
        }
      })
    }
  }

  render() {
    const showLoadingSpinner = this.props.relay.hasMore()

    return (
      <View>
        <View>
          {this.props.headerView}
          {this.conversations && <Headline>Messages</Headline>}
        </View>
        <FlatList
          data={this.state.conversations}
          keyExtractor={(_item, index) => String(index)}
          scrollEventThrottle={500}
          renderItem={({ item }) => {
            return (
              <ConversationSnippet
                conversation={item}
                onSelected={() => SwitchBoard.presentNavigationViewController(this, `conversation/${item.id}`)}
              />
            )
          }}
          onScroll={isCloseToBottom(this.fetchData)} // TODO: Investiate why onEndReached fires erroniously
        />
        {showLoadingSpinner && <Spinner style={{ marginTop: 20, marginBottom: 20 }} />}
      </View>
    )
  }
}

export default createPaginationContainer(
  Conversations,
  {
    me: graphql`
      fragment Conversations_me on Me
        @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String", defaultValue: "" }) {
        conversations(first: $count, after: $cursor) @connection(key: "Conversations_conversations") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              id
              last_message
              ...ConversationSnippet_conversation
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.me && (props.me.conversations as ConnectionData)
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query ConversationsQuery($count: Int!, $cursor: String) {
        me {
          ...Conversations_me @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
) as React.ComponentClass<Props>

interface RelayProps {
  me: {
    conversations: {
      pageInfo: {
        hasNextPage: boolean
      } | null
      edges: Array<{
        node: {
          id: string | null
          last_message: string
        } | null
      } | null> | null
    } | null
  }
}
