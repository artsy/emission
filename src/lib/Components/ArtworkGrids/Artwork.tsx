import { color, Flex, Sans } from "@artsy/palette"
import colors from "lib/data/colors"
import SwitchBoard from "lib/NativeModules/SwitchBoard"
import { map } from "lodash"
import React from "react"
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components/native"
import ImageView from "../OpaqueImageView"
import SerifText from "../Text/Serif"

import { Artwork_artwork } from "__generated__/Artwork_artwork.graphql"

const Badges = styled.View`
  position: absolute;
  bottom: 16px;
  left: 1px;
  display: flex;
  flex-direction: row;
`
const Badge = styled.View`
  border-radius: 2px;
  padding: 3px 5px 1px 6px;
  background-color: white;
  margin-left: 5px;
`

interface Props {
  artwork: Artwork_artwork
  // Passes the Artwork ID back up to another component
  // ideally, this would be used to send an array of Artworks
  // through to Eigen where this item is the default selected one.
  //
  // If it's not provided, then it will push just the one artwork
  // to the switchboard.
  onPress?: (artworkID: string) => void
}

class Artwork extends React.Component<Props, any> {
  handleTap() {
    this.props.onPress && this.props.artwork.id
      ? this.props.onPress(this.props.artwork.id)
      : SwitchBoard.presentNavigationViewController(this, this.props.artwork.href)
  }

  render() {
    const artwork = this.props.artwork
    const partnerName = this.props.artwork.partner && this.props.artwork.partner.name
    return (
      <TouchableWithoutFeedback onPress={this.handleTap.bind(this)}>
        <View>
          <View>
            <ImageView style={styles.image} aspectRatio={artwork.image.aspect_ratio} imageURL={artwork.image.url} />
            {this.badges()}
          </View>
          {this.saleInfoLine()}
          {this.artists()}
          {this.artworkTitle()}
          {partnerName && <SerifText style={styles.text}>{partnerName}</SerifText>}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  hasBadges() {
    const { is_acquireable, is_biddable } = this.props.artwork
    return is_acquireable || is_biddable
  }

  badges() {
    const { is_acquireable, is_biddable } = this.props.artwork

    return (
      this.hasBadges() && (
        <Badges>
          {is_acquireable && (
            <Badge>
              <Sans weight="medium" fontSize={8} lineHeight={9} size="1">
                BUY NOW
              </Sans>
            </Badge>
          )}
          {is_biddable && (
            <Badge>
              <Sans weight="medium" fontSize={8} lineHeight={9} size="1">
                BID
              </Sans>
            </Badge>
          )}
        </Badges>
      )
    )
  }

  artists() {
    const artists = this.props.artwork.artists
    if (artists && artists.length > 0) {
      return <SerifText style={[styles.text, styles.artist]}>{map(artists, "name").join(", ")}</SerifText>
    } else {
      return null
    }
  }

  artworkTitle() {
    const artwork = this.props.artwork
    if (artwork.title) {
      return (
        <SerifText style={styles.text}>
          <SerifText style={[styles.text, styles.title]}>{artwork.title}</SerifText>
          {artwork.date ? ", " + artwork.date : ""}
        </SerifText>
      )
    } else {
      return null
    }
  }

  saleInfoLine() {
    const { artwork } = this.props
    const { sale } = artwork
    const inClosedAuction = sale && sale.is_auction && sale.is_closed

    // TODO: Look into wrapping in <Theme> component to remove `color` util functions
    return (
      <Flex flexDirection="row" mb={2}>
        <Sans color={color("black100")} weight="medium" size="2">
          {inClosedAuction ? "Bidding closed" : this.saleMessageOrBidInfo()}{" "}
        </Sans>
        <Sans size="2" color={color("black60")}>
          {!inClosedAuction && this.auctionInfo()}
        </Sans>
      </Flex>
    )
  }

  saleMessageOrBidInfo() {
    const { artwork } = this.props
    const { sale } = artwork
    const inRunningAuction = sale && sale.is_auction && !sale.is_closed

    if (inRunningAuction) {
      const sa = artwork.sale_artwork
      const currentBid = sa.current_bid
      return currentBid && currentBid.display
    }

    // TODO: Extract this sentence-cased version and apply everywhere.
    if (artwork.sale_message === "Contact For Price") {
      return "Contact for price"
    }

    return artwork.sale_message
  }

  auctionInfo() {
    const { artwork } = this.props
    const { sale } = artwork

    if (sale) {
      return `(${sale.display_timely_at})`
    }
  }
}

const styles = StyleSheet.create({
  image: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: colors["gray-semibold"],
  },
  artist: {
    fontWeight: "bold",
  },
  title: {
    fontStyle: "italic",
  },
})

export default createFragmentContainer(
  Artwork,
  graphql`
    fragment Artwork_artwork on Artwork {
      title
      date
      sale_message
      is_in_auction
      is_biddable
      is_acquireable
      id
      sale {
        is_auction
        is_live_open
        is_open
        is_closed
        display_timely_at
      }
      sale_artwork {
        opening_bid {
          display
        }
        current_bid {
          display
        }
        bidder_positions_count
        sale {
          is_closed
        }
      }
      image {
        url(version: "large")
        aspect_ratio
      }
      artists(shallow: true) {
        name
      }
      partner {
        name
      }
      href
    }
  `
)
