import { Theme } from "@artsy/palette"
import { CitySavedList_viewer } from "__generated__/CitySavedList_viewer.graphql"
import { PAGE_SIZE } from "lib/data/constants"
import { isCloseToBottom } from "lib/utils/isCloseToBottom"
import { Schema, screenTrack } from "lib/utils/track"
import React from "react"
import { createPaginationContainer, graphql, RelayPaginationProp } from "react-relay"
import { EventList } from "./Components/EventList"

interface Props {
  viewer: CitySavedList_viewer
  relay: RelayPaginationProp
  citySlug: string
}

interface State {
  fetchingNextPage: boolean
}

@screenTrack((props: Props) => ({
  context_screen: Schema.PageNames.CityGuideSavedList,
  context_screen_owner_type: Schema.OwnerEntityTypes.CityGuide,
  context_screen_owner_slug: props.citySlug,
  context_screen_owner_id: props.citySlug,
}))
class CitySavedList extends React.Component<Props, State> {
  state = {
    fetchingNextPage: false,
  }

  fetchData = () => {
    const { relay } = this.props

    if (!relay.hasMore() || relay.isLoading()) {
      return
    }
    this.setState({ fetchingNextPage: true })
    relay.loadMore(PAGE_SIZE, error => {
      if (error) {
        console.error("CitySectionList.tsx #fetchData", error.message)
        // FIXME: Handle error
      }
      this.setState({ fetchingNextPage: false })
    })
  }

  // @TODO: Implement test for this component
  render() {
    const {
      viewer: {
        me: {
          followsAndSaves: {
            shows: { edges },
          },
        },
        city: { name },
      },
      relay,
    } = this.props
    const { fetchingNextPage } = this.state
    return (
      <Theme>
        <EventList
          header="Saved shows"
          cityName={name}
          bucket={edges.map(e => e.node) as any}
          type="saved"
          relay={relay}
          onScroll={isCloseToBottom(this.fetchData)}
          fetchingNextPage={fetchingNextPage}
        />
      </Theme>
    )
  }
}

export default createPaginationContainer(
  CitySavedList,
  graphql`
    fragment CitySavedList_viewer on Viewer
      @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, cursor: { type: "String", defaultValue: "" }) {
      city(slug: $citySlug) {
        name
      }
      me {
        followsAndSaves {
          shows(first: $count, status: RUNNING_AND_UPCOMING, city: $citySlug, after: $cursor)
            @connection(key: "CitySavedList_shows") {
            edges {
              node {
                id
                _id
                __id
                name
                isStubShow
                status
                href
                is_followed
                isStubShow
                exhibition_period
                cover_image {
                  url
                }
                location {
                  coordinates {
                    lat
                    lng
                  }
                }
                type
                start_at
                end_at
                partner {
                  ... on Partner {
                    name
                    type
                    profile {
                      # This is only used for stubbed shows
                      image {
                        url(version: "square")
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer.me && props.viewer.me.followsAndSaves && props.viewer.me.followsAndSaves.shows
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        citySlug: props.citySlug,
        ...fragmentVariables,
        count,
        cursor,
      }
    },
    query: graphql`
      query CitySavedListQuery($count: Int!, $cursor: String, $citySlug: String!) {
        viewer {
          ...CitySavedList_viewer @arguments(city: $citySlug, count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
