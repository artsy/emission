import React from "react"
import { Text, View } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  saleID: string
}

export class LotsByFollowedArtists extends React.Component<Props, any> {
  render() {
    console.log(this.props)
    return (
      <View>
        <Text>hmmm hi</Text>
      </View>
    )
  }
}

export default createFragmentContainer(
  LotsByFollowedArtists,
  graphql`
    fragment LotsByFollowedArtists_lot on SaleArtwork @relay(plural: true) {
      id
      lot_label
      counts {
        bidder_positions
      }
      current_bid {
        display
      }
      artwork {
        _id
        sale {
          id
        }
      }
    }
  `
)
