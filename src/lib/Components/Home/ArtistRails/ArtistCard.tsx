import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import {
  Animated,
  NativeModules,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
const { ARTemporaryAPIModule } = NativeModules

import colors from "lib/data/colors"
import fonts from "lib/data/fonts"
import Events from "lib/NativeModules/Events"
import SwitchBoard from "lib/NativeModules/SwitchBoard"

import { Button } from "@artsy/palette"
import ImageView from "lib/Components/OpaqueImageView"

import { ArtistCard_artist } from "__generated__/ArtistCard_artist.graphql"

type ArtistFollowHandlerResult = Promise<Animated.EndResult>
export type ArtistFollowButtonStatusSetter = (status: boolean) => ArtistFollowHandlerResult
export type ArtistFollowHandler = (setFollowButtonStatus: ArtistFollowButtonStatusSetter) => void

interface Props {
  artist: ArtistCard_artist
  onFollow?: ArtistFollowHandler
}

interface State {
  processingChange: boolean
  following?: boolean
}

export class ArtistCard extends React.Component<Props, State> {
  state = {
    processingChange: false,
    following: null,
  }

  handleTap() {
    SwitchBoard.presentNavigationViewController(this, this.props.artist.href)
  }

  handleFollowChange = () => {
    this.setState({ processingChange: true })

    ARTemporaryAPIModule.setFollowArtistStatus(true, this.props.artist.internalID, (error, _following) => {
      if (error) {
        console.warn(error)
        this.setState({ processingChange: false })
      } else {
        Events.postEvent({
          name: "Follow artist",
          artist_id: this.props.artist.internalID,
          artist_slug: this.props.artist.slug,
          // TODO: At some point, this component might be on other screens.
          source_screen: "home page",
          context_module: "artist rail",
        })
        this.props.onFollow(this.setFollowStatus.bind(this))
      }
    })
  }

  setFollowStatus(status: boolean): ArtistFollowHandlerResult {
    return new Promise(resolve => {
      this.setState(
        {
          following: status,
          processingChange: false,
        },
        () => {
          setTimeout(resolve, 400)
        }
      )
    })
  }

  renderMetadata() {
    const artist = this.props.artist
    const lines = []

    lines.push(
      <Text key={1} numberOfLines={1} style={styles.sansSerifText}>
        {artist.name.toUpperCase()}
      </Text>
    )

    if (artist.formatted_nationality_and_birthday) {
      lines.push(
        <Text key={2} numberOfLines={1} style={styles.serifText}>
          {artist.formatted_nationality_and_birthday}
        </Text>
      )
    }

    if (artist.formatted_artworks_count) {
      lines.push(
        <Text key={3} numberOfLines={1} style={[styles.serifText, styles.serifWorksText]}>
          {artist.formatted_artworks_count}
        </Text>
      )
    }

    return lines
  }

  render() {
    const artist = this.props.artist
    const imageURL = artist.image && artist.image.url

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleTap.bind(this)}>
          <View style={styles.touchableContainer}>
            <ImageView style={styles.image} imageURL={imageURL} />
            <View style={styles.textContainer}>{this.renderMetadata()}</View>
            <View style={styles.followButton}>
              <Button
                variant={this.state.following ? "secondaryOutline" : "primaryBlack"}
                onPress={this.handleFollowChange}
                size="small"
                block
                width={100}
                loading={this.state.processingChange}
              >
                {this.state.following ? "Following" : "Follow"}
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

interface Styles {
  container: ViewStyle
  sansSerifText: TextStyle
  serifText: TextStyle
  touchableContainer: ViewStyle
  image: ViewStyle
  textContainer: ViewStyle
  serifWorksText: TextStyle
  followButton: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  // TODO: The outer wrapping view is currently only there because setting `marginLeft: 16` on the Artist card from the
  //      ArtistRail component isn’t working.
  container: {
    width: 236,
    height: 310,
  },
  touchableContainer: {
    width: 220,
    height: 280,
    marginLeft: 16,
    borderColor: "#F3F3F3",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  image: {
    width: 196,
    height: 148,
    marginTop: 12,
    marginLeft: 12,
  },
  textContainer: {
    marginLeft: 12,
    marginTop: 12,
  },
  sansSerifText: {
    marginRight: 12,
    height: 17,
    fontSize: 12,
    textAlign: "left",
    fontFamily: fonts["avant-garde-regular"],
  },
  serifText: {
    marginRight: 12,
    height: 17,
    fontFamily: "AGaramondPro-Regular",
    fontSize: 16,
    color: "#000000",
  },
  serifWorksText: {
    color: colors["gray-semibold"],
  },
  followButton: {
    marginTop: 12,
    marginLeft: 12,
    width: 196,
    height: 30,
    position: "absolute",
    bottom: 15,
  },
})

const ArtistCardContainer = createFragmentContainer(ArtistCard, {
  artist: graphql`
    fragment ArtistCard_artist on Artist {
      slug
      internalID
      href
      name
      formatted_artworks_count
      formatted_nationality_and_birthday
      image {
        url(version: "large")
      }
    }
  `,
})

export interface ArtistCardResponse {
  id: string
  gravityID: string
  internalID: string
  href: string
  name: string
  formatted_artworks_count: number
  formatted_nationality_and_birthday: string
  image: {
    url: string
  }
}

// TODO: Until we figure out how to use Relay to fetch/render suggested artists and replace initially suggested cards,
//      this query is duplicated so we can fetch the data manually.
export const ArtistCardQuery = `
  ... on Artist {
    gravityID
    id
    internalID
    href
    name
    formatted_artworks_count
    formatted_nationality_and_birthday
    image {
      url(version: "large")
    }
  }
`

export default ArtistCardContainer
