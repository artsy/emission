import * as React from "react"
import { Image, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import * as Relay from "react-relay"

import SwitchBoard from "../../NativeModules/SwitchBoard"
import ArtworksGrid from "../ArtworkGrids/GenericGrid"
import Headline from "../Text/Headline"
import SerifText from "../Text/Serif"

import colors from "../../../data/colors"

export class Notification extends React.Component<RelayProps, any> {
  handleArtistTap() {
    // Special notifications will pass down an artistHref. Otherwise, grab it from the artworks
    const artistHref = this.props.notification.artistHref || this.props.notification.artworks[0].artists[0].href
    if (!artistHref) {
      return
    }
    SwitchBoard.presentNavigationViewController(this, artistHref)
  }

  render() {
    const notification = this.props.notification

    // artwork-less notifications are rare but possible and very unsightly
    if (!notification.artworks.length) {
      return null
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleArtistTap.bind(this)}>
          <View style={styles.header}>
            {notification.image &&
              <Image source={{ uri: notification.image.resized.url }} style={styles.artistAvatar} />}
            <View style={styles.metadataContainer}>
              <View style={styles.nameAndStatusContainer}>
                <Headline style={styles.artistName}>{notification.artists}</Headline>
                {notification.status === "UNREAD" && <View style={styles.readStatus} />}
              </View>
              <SerifText style={styles.metadata}>{notification.message + " · " + notification.date}</SerifText>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.gridContainer}>
          <ArtworksGrid artworks={notification.artworks} />
        </View>
      </View>
    )
  }
}

interface Styles {
  container: ViewStyle
  header: ViewStyle
  artistAvatar: ViewStyle
  metadataContainer: ViewStyle
  nameAndStatusContainer: ViewStyle
  readStatus: ViewStyle
  artistName: TextStyle
  metadata: TextStyle
  gridContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
  },
  artistAvatar: {
    height: 40,
    width: 40,
    backgroundColor: colors["gray-light"],
    alignSelf: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  metadataContainer: {
    alignSelf: "center",
    flex: 1,
  },
  nameAndStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  readStatus: {
    backgroundColor: colors["purple-regular"],
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  artistName: {
    fontSize: 14,
  },
  metadata: {
    marginTop: 2,
    fontSize: 16,
    color: colors["gray-semibold"],
  },
  gridContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
})

export default Relay.createContainer(Notification, {
  fragments: {
    notification: () => Relay.QL`
      fragment on NotificationsFeedItem {
        date(format: "MMM D")
        message
        artists
        artworks {
          artists(shallow: true) {
            href
          }
          ${ArtworksGrid.getFragment("artworks")}
        }
        status
        image {
          resized(height: 80, width: 80) {
            url
          }
        }
      }
    `,
  },
})

interface RelayProps {
  notification: {
    date: string
    message: string
    artists: string
    artworks: any[]
    status: string
    image: {
      resized: {
        url: string
      }
    } | null
    artistHref?: string | null
  }
}
