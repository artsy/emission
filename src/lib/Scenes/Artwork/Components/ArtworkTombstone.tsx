import { Box, Flex, Serif } from "@artsy/palette"
import { ArtworkTombstone_artwork } from "__generated__/ArtworkTombstone_artwork.graphql"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import React from "react"
import { NativeModules, Text, TouchableWithoutFeedback } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "./FollowArtistButton"

const Constants = NativeModules.ARCocoaConstantsModule

type Artist = ArtworkTombstone_artwork["artists"][0]

export interface ArtworkTombstoneProps {
  artwork: ArtworkTombstone_artwork
}

export interface ArtworkTombstoneState {
  showingMoreArtists: boolean
}

export class ArtworkTombstone extends React.Component<ArtworkTombstoneProps, ArtworkTombstoneState> {
  state = {
    showingMoreArtists: false,
  }
  handleTap(href: string) {
    SwitchBoard.presentNavigationViewController(this, href)
  }

  showAttributionClassFAQ() {
    SwitchBoard.presentNavigationViewController(this, "/artwork-classifications")
  }

  showMoreArtists = () => {
    this.setState({
      showingMoreArtists: !this.state.showingMoreArtists,
    })
  }

  renderSingleArtist(artist: Artist) {
    return (
      <React.Fragment>
        <Flex flexDirection="row">
          {this.renderArtistName(artist.name, artist.href)}
          <FollowArtistButton artist={artist} />
        </Flex>
      </React.Fragment>
    )
  }

  renderArtistName(artistName: string, href: string) {
    return href ? (
      <TouchableWithoutFeedback onPress={this.handleTap.bind(this, href)}>
        <Serif size="4t" weight="semibold">
          {artistName}
        </Serif>
      </TouchableWithoutFeedback>
    ) : (
      <Serif size="4t" weight="semibold">
        {artistName}
      </Serif>
    )
  }

  renderMultipleArtists = () => {
    const {
      artwork: { artists },
    } = this.props

    const truncatedArtists = !this.state.showingMoreArtists ? artists.slice(0, 3) : artists
    const artistNames = truncatedArtists.map((artist, index) => {
      const artistNameWithComma = index !== artists.length - 1 ? artist.name + ", " : artist.name
      return (
        <React.Fragment key={artist.href}>{this.renderArtistName(artistNameWithComma, artist.href)}</React.Fragment>
      )
    })

    return (
      <Flex flexDirection="row" flexWrap="wrap">
        <Serif size="4t">
          {artistNames}
          {!this.state.showingMoreArtists &&
            artists.length > 3 && (
              <TouchableWithoutFeedback onPress={this.showMoreArtists}>
                <Serif size="4t" weight="semibold">
                  {artists.length - 3} more
                </Serif>
              </TouchableWithoutFeedback>
            )}
        </Serif>
      </Flex>
    )
  }

  render() {
    const { artwork } = this.props
    return (
      <Box textAlign="left">
        <Flex flexDirection="row" flexWrap="wrap">
          {artwork.artists.length === 1 ? this.renderSingleArtist(artwork.artists[0]) : this.renderMultipleArtists()}
          {artwork.artists.length === 0 &&
            artwork.cultural_maker &&
            this.renderArtistName(artwork.cultural_maker, null)}
        </Flex>
        <Flex flexDirection="row">
          <Serif italic color="black60" size="3t" m="0" p="0">
            {artwork.title},{" "}
          </Serif>
          <Serif color="black60" size="3t" m="0" p="0">
            {artwork.date}
          </Serif>
        </Flex>
        <Serif color="black60" size="3t">
          {artwork.medium}
        </Serif>
        <Serif color="black60" size="3t">
          {Constants.CurrentLocale === "en_US" ? artwork.dimensions.in : artwork.dimensions.cm}
        </Serif>
        {artwork.edition_of && (
          <Serif color="black60" size="3t">
            {artwork.edition_of}
          </Serif>
        )}
        {artwork.attribution_class && (
          <Text style={{ textDecorationLine: "underline" }} onPress={() => this.handleTap("/artwork-classifications")}>
            <Serif color="black60" size="3t">
              {artwork.attribution_class.shortDescription}
            </Serif>
          </Text>
        )}
      </Box>
    )
  }
}

export const ArtworkTombstoneFragmentContainer = createFragmentContainer(ArtworkTombstone, {
  artwork: graphql`
    fragment ArtworkTombstone_artwork on Artwork {
      title
      medium
      date
      cultural_maker
      artists {
        name
        href
        ...FollowArtistButton_artist
      }
      dimensions {
        in
        cm
      }
      edition_of
      attribution_class {
        shortDescription
      }
    }
  `,
})
