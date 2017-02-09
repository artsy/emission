import * as Relay from 'react-relay'
import * as React from 'react'

import { View, StyleSheet, Dimensions, ViewProperties } from 'react-native'

import Biography from './biography'
import Articles from './articles'
import RelatedArtists from '../related_artists'
import Separator from '../separator'
import NavButton from '../buttons/navigation_button'

interface Props extends ViewProperties {
  artist: any
}

class About extends React.Component<Props, null> {
  render() {
    return (
      <View>
        { this.biography() }
        { this.articles() }
        { this.relatedArtists() }
      </View>
    )
  }

  biography() {
    if (this.props.artist.has_metadata) {
      return (
        <View>
          <Biography artist={this.props.artist} />
          { this.auctionResults() }
          <Separator style={styles.sectionSeparator} />
        </View>
      )
    }
  }

  auctionResults() {
    if (this.props.artist.is_display_auction_link) {
      // Keeps the same margins as the bio text
      const sideMargin = Dimensions.get('window').width > 700 ? 50 : 20
      const url = `/artist/${this.props.artist.id}/auction-results`
      return <NavButton title="Auction Results" href={url} style={{ marginLeft: sideMargin, marginRight: sideMargin }}/>
    }
  }

  articles() {
    if (this.props.artist.articles.length) {
      return (
        <View>
          <Articles articles={this.props.artist.articles} />
          <Separator style={styles.sectionSeparator} />
        </View>
      )
    }
  }

  relatedArtists() {
    return this.props.artist.related_artists.length
      ? <RelatedArtists artists={this.props.artist.related_artists}/>
      : null
  }

}

const styles = StyleSheet.create({
  sectionSeparator: {
    marginBottom: 20,
  }
})

export default Relay.createContainer(About, {
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        has_metadata
        is_display_auction_link
        id
        ${Biography.getFragment('artist')}
        related_artists: artists(size: 16) {
          ${RelatedArtists.getFragment('artists')}
        }
        articles {
          ${Articles.getFragment('articles')}
        }
      }
    `,
  }
})
