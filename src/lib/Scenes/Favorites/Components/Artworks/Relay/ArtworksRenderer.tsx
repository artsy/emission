import React from "react"
import { graphql, QueryRenderer } from "react-relay"

import createEnvironment from "lib/relay/createEnvironment"
const environment = createEnvironment()

export default ({ render }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query ArtworksRendererQuery($count: Int!, $cursor: String) {
          me {
            ...Artworks_me @arguments(count: $count, cursor: $cursor)
          }
        }
      `}
      variables={{
        count: 10,
      }}
      render={render}
    />
  )
}
