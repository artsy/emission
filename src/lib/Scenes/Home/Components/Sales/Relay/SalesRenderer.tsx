import React from "react"
import { graphql, QueryRenderer, QueryRendererProps } from "react-relay"

import createEnvironment from "lib/relay/createEnvironment"
const environment = createEnvironment()

const SalesRenderer: React.SFC<any> = ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query SalesRendererQuery {
          sales: sales(live: true, is_auction: true) {
            ...Sales_sales
          }
          lots: filter_sale_artworks(
            aggregations: [TOTAL]
            page: 1
            size: 100
            include_artworks_by_followed_artists: true
          ) {
            counts {
              total
            }
            hits {
              ...LotsByFollowedArtists_lot
            }
          }
        }
      `}
      variables={{}}
      render={render}
    />
  )
}

export default SalesRenderer
