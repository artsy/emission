/* @flow */
'use strict'

import Relay from 'react-relay'
import React from 'react'
import { View, StyleSheet } from 'react-native'

import Separator from '../../separator'
import SerifText from '../../text/serif'
import Artwork from '../../artwork_grids/artwork'
import ArtworksGrid from '../../artwork_grids/infinite_scroll_grid'

import colors from '../../../../data/colors'

const PageSize = 10

class Artworks extends React.Component {
  state: {
    completedForSaleWorks: boolean
  }

  constructor(props) {
    super(props)
    this.state = { completedForSaleWorks: false }
  }

  onFetchMore(cb = () => {}) {
    console.log('onfetchmore, this', this)
    this.props.relay.setVariables({
      pageSize: this.props.relay.variables.pageSize + PageSize
    }, cb)
  }

  render() {
    const for_sale_count = this.props.artist.counts.for_sale_artworks
    const other_count = this.props.artist.counts.artworks - for_sale_count
    if (for_sale_count === 0) {
      return this.renderSection('Works',
                                other_count,
                                this.props.artist.not_for_sale_artworks,
                                { availability: 'IS_NOT_FOR_SALE' },
                                this.resolveQuery,
                                 null)
    } else {
      const otherWorks = []
      const showOtherWorks = (other_count > 0) && (for_sale_count < 10 || this.state.completedForSaleWorks)
      if (showOtherWorks) {
        otherWorks.push(<Separator style={styles.sectionSeparator} key="separator" />)
        otherWorks.push(this.renderSection('Other Works',
                        other_count,
                        this.props.artist.not_for_sale_artworks,
                        { availability: 'IS_NOT_FOR_SALE' },
                        null))
      }
      return (
        <View style={styles.section}>
          {this.renderSection('Works for Sale',
                              for_sale_count,
                              this.props.artist.for_sale_artworks,
                              { availability: 'IS_FOR_SALE'},
                              () => { this.setState({ completedForSaleWorks: true }) }
          )}
          {otherWorks}
        </View>
      )
    }
  }

  renderSection(title: string, count: number, artworks: any[], stateQuery: any, onComplete: any){
    return (
      <View key={title}>
        <SerifText style={styles.heading}>
          <SerifText style={styles.text}>{title}</SerifText> <SerifText style={[styles.text, styles.count]}>({count})</SerifText>
        </SerifText>
        <ArtworksGrid
          artworks={artworks}
          queryState={stateQuery}
          onComplete={onComplete}
          onFetchMore={this.onFetchMore.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
  count: {
    color: colors['gray-semibold'],
  },
  section: {
    marginBottom: 40,
  },
  sectionSeparator: {
    marginTop: 40, // FIXME: This is because the above `section.marginBottom` didn’t work before the separator.
    marginBottom: 20,
  }
})

export default Relay.createContainer(Artworks, {
  initialVariables: {
    pageSize: PageSize
  },
  fragments: {
    artist: () => Relay.QL`
      fragment on Artist {
        counts {
          artworks
          for_sale_artworks
        }
        for_sale_artworks: artworks_connection(sort: partner_updated_at_desc, filter: IS_NOT_FOR_SALE, first: $pageSize) {
          edges {
            node {
              image {
                id
              }
              ${Artwork.getFragment('artwork')}
            }
          }
        }
        not_for_sale_artworks: artworks_connection(sort: partner_updated_at_desc, filter: IS_NOT_FOR_SALE, first: $pageSize) {
          edges {
            node {
              image {
                id
              }
              ${Artwork.getFragment('artwork')}
            }
          }
        }
      }
    `,
  }
})
