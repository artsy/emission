import { BidderPositionQueryResponse } from "__generated__/BidderPositionQuery.graphql"
import { metaphysics } from "../../../../metaphysics"

// We need this so the relay-compiler can auto-generate types.
export const graphql = (strings, ...keys) => {
  const lastIndex = strings.length - 1
  return strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], "") + strings[lastIndex]
}

export const bidderPositionQuery = (bidderPositionID: string) => {
  return metaphysics<{ data: BidderPositionQueryResponse }>({
    query: graphql`
      query BidderPositionQuery($bidderPositionID: String!) {
        me {
          bidder_position(id: $bidderPositionID) {
            status
            message_header
            message_description_md
            position {
              internalID
              suggested_next_bid {
                cents
                display
              }
            }
          }
        }
      }
    `,
    variables: {
      bidderPositionID,
    },
  })
}
