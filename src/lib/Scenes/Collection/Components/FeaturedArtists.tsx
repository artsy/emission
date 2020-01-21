import { Box, Button, EntityHeader, Flex, Sans } from "@artsy/palette"
import { FeaturedArtists_collection } from "__generated__/FeaturedArtists_collection.graphql"
import { FeaturedArtists_collectionMutation } from "__generated__/FeaturedArtists_collectionMutation.graphql"
import Events from "lib/NativeModules/Events"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { get } from "lib/utils/get"
import React from "react"
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native"
import { commitMutation, createFragmentContainer, graphql, RelayProp } from "react-relay"

interface FeaturedArtistsProps {
  collection: FeaturedArtists_collection
  relay: RelayProp
}

interface FeaturedArtistsState {
  showMore: boolean
  isFollowedChanging: boolean
}

export class FeaturedArtists extends React.Component<FeaturedArtistsProps, FeaturedArtistsState> {
  state = {
    showMore: false,
    isFollowedChanging: false,
  }

  handleTap = (context: any, href: string) => {
    SwitchBoard.presentNavigationViewController(context, href)
  }

  getFeaturedArtistEntityCollection = (
    artists: FeaturedArtists_collection["artworksConnection"]["merchandisableArtists"]
  ) => {
    return artists.map((artist, index) => {
      const hasArtistMetaData = artist.nationality && artist.birthday
      const artistImageUrl = get(artist, a => a.image.resized.url, "")

      return (
        <Box width="100%" key={index} pb={20}>
          <TouchableWithoutFeedback onPress={() => this.handleTap(this, `/artist/${artist.slug}`)}>
            <EntityHeader
              imageUrl={artistImageUrl}
              name={artist.name}
              meta={hasArtistMetaData ? `${artist.nationality}, b. ${artist.birthday}` : undefined}
              href={`/artist/${artist.slug}`}
              FollowButton={
                <Button
                  variant={artist.isFollowed ? "primaryBlack" : "secondaryOutline"}
                  size="small"
                  longestText="Following"
                  onPress={() => this.handleFollowArtist(artist)}
                >
                  {artist.isFollowed ? "Following" : "Follow"}
                </Button>
              }
            />
          </TouchableWithoutFeedback>
        </Box>
      )
    })
  }

  getFeaturedArtists = () => {
    const allArtists = this.props.collection?.artworksConnection?.merchandisableArtists || []
    const featuredArtistExclusionIds = this.props.collection?.featuredArtistExclusionIds || []
    const artistIDs = this.props.collection?.query?.artistIDs || []

    if (artistIDs.length > 0) {
      return allArtists.filter(artist => artistIDs.includes(artist.internalID))
    }

    if (featuredArtistExclusionIds.length > 0) {
      return allArtists.filter(artist => !featuredArtistExclusionIds.includes(artist.internalID))
    }
    return allArtists
  }

  failedFollowChange() {
    // callback for analytics purposes
    this.setState({
      isFollowedChanging: false,
    })
  }

  successfulFollowChange() {
    // callback for analytics purposes
    Events.userHadMeaningfulInteraction()
    this.setState({
      isFollowedChanging: false,
    })
  }

  handleFollowArtist(artist) {
    const { slug, id, isFollowed } = artist
    const { relay } = this.props
    const { isFollowedChanging } = this.state

    if (isFollowedChanging) {
      return
    }

    this.setState(
      {
        isFollowedChanging: true,
      },
      () => {
        commitMutation<FeaturedArtists_collectionMutation>(relay.environment, {
          onCompleted: () => this.successfulFollowChange(),
          mutation: graphql`
            mutation FeaturedArtists_collectionMutation($input: FollowArtistInput!) {
              followArtist(input: $input) {
                artist {
                  id
                  isFollowed
                }
              }
            }
          `,
          variables: {
            input: {
              artistID: slug,
              unfollow: isFollowed,
            },
          },
          optimisticResponse: {
            followArtist: {
              artist: {
                id,
                isFollowed: !isFollowed,
              },
            },
          },
          onError: () => this.failedFollowChange(),
        })
      }
    )
  }

  render() {
    const artists = this.getFeaturedArtists()
    if (artists.length <= 0) {
      return null
    }

    const hasMultipleArtists = artists.length > 1
    const featuredArtistEntityCollection = this.getFeaturedArtistEntityCollection(artists)
    const artistCount = 3
    const remainingCount = artists.length - artistCount
    const truncatedArtists = featuredArtistEntityCollection.slice(0, artistCount)
    const headlineLabel = "Featured Artist" + (hasMultipleArtists ? "s" : "")

    return (
      <Box pb={1}>
        <Sans size="2" weight="medium" pb={15}>
          {headlineLabel}
        </Sans>
        <Flex flexWrap="wrap">
          {this.state.showMore || artists.length <= artistCount ? (
            featuredArtistEntityCollection
          ) : (
            <>
              {truncatedArtists}
              <TouchableHighlight
                onPress={() => {
                  this.setState({ showMore: true })
                }}
              >
                <EntityHeader initials={`+ ${remainingCount}`} name="View more" />
              </TouchableHighlight>
            </>
          )}
        </Flex>
      </Box>
    )
  }
}

export const CollectionFeaturedArtistsContainer = createFragmentContainer(FeaturedArtists, {
  collection: graphql`
    fragment FeaturedArtists_collection on MarketingCollection
      @argumentDefinitions(screenWidth: { type: "Int", defaultValue: 500 }) {
      # TODO: size:9 is not actually limiting to 9 items. We need to figure out
      #  why the back-end is not respecting that argument.
      artworksConnection(aggregations: [MERCHANDISABLE_ARTISTS], size: 9, sort: "-decayed_merch") {
        merchandisableArtists {
          id
          slug
          internalID
          name
          image {
            resized(width: $screenWidth) {
              url
            }
          }
          birthday
          nationality
          isFollowed
        }
      }
      query {
        artistIDs
      }
      featuredArtistExclusionIds
    }
  `,
})
