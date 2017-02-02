import Relay from 'react-relay'
import React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'

import colors from '../../../data/colors'
import ImageView from '../opaque_image_view'
import SwitchBoard from '../../native_modules/switch_board'

class RelatedArtist extends React.Component {
  handleTap() {
    SwitchBoard.presentNavigationViewController(this, this.props.artist.href)
  }

  render() {
    const artist = this.props.artist
    const imageURL = artist.image && artist.image.url

    return (
      <TouchableWithoutFeedback onPress={this.handleTap.bind(this)}>
        <View style={{ margin: 5, paddingBottom: 20, width: this.props.imageSize.width }}>
          <ImageView style={this.props.imageSize} imageURL={imageURL} />
          <Text style={styles.sansSerifText}>{artist.name.toUpperCase()}</Text>
          <Text style={styles.serifText}>{this.artworksString(artist.counts)}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  artworksString(counts) {
    if (counts.totalWorks <= 0) {
      return ''
    }

    const totalWorks = counts.artworks ? counts.artworks + (counts.artworks > 1 ? ' works' : ' work') : null
    if (totalWorks && counts.for_sale_artworks === counts.artworks) {
      return totalWorks + ' for sale'
    }

    const forSale = counts.for_sale_artworks ? counts.for_sale_artworks + ' for sale' : null
    if (forSale && totalWorks) {
      return totalWorks + ', ' + forSale
    }
    return forSale ? forSale : totalWorks
  }
}

const styles = StyleSheet.create({
  sansSerifText: {
    fontSize: 12,
    textAlign: 'left',
    marginTop: 10,
    fontFamily: 'Avant Garde Gothic ITCW01Dm',
  },
  serifText: {
    fontFamily: 'AGaramondPro-Regular',
    fontSize: 16,
    marginTop: 5,
    color: colors['gray-semibold']
  }
})

export default Relay.createContainer(RelatedArtist, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        href
        name
        counts {
          for_sale_artworks
          artworks
        }
        image {
          url(version: "large")
        }
      }
    `,
  }
})

interface RelayProps {
  artist: {
    href: string | null,
    name: string | null,
    counts: {
      for_sale_artworks: boolean | number | string | null,
      artworks: boolean | number | string | null,
    } | null,
    image: {
      url: string | null,
    } | null,
  },
}
