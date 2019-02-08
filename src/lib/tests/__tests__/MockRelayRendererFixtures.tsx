// This is our only test file to need to specify its own query renderer, which fails to pass linting.
/* tslint:disable:relay-operation-generics */

import cheerio from "cheerio"
import { render } from "enzyme"
import * as React from "react"
import { Image, Text, View } from "react-native"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ContextConsumer } from "../../utils/Context"
import renderWithLoadProgress from "../../utils/renderWithLoadProgress"

const Metadata = createFragmentContainer(
  (props: { artworkMetadata }) => <Text>{props.artworkMetadata.title}</Text>,
  graphql`
    fragment MockRelayRendererFixtures_artworkMetadata on Artwork {
      title
    }
  `
)

export const Artwork = createFragmentContainer(
  (props: { artwork }) => (
    <View>
      <Image source={{ uri: props.artwork.image.url }} />
      <Metadata artworkMetadata={props.artwork} />
      {props.artwork.artist && <ArtistQueryRenderer id={props.artwork.artist.id} />}
    </View>
  ),
  graphql`
    fragment MockRelayRendererFixtures_artwork on Artwork {
      image {
        url
      }
      artist {
        id
      }
      ...MockRelayRendererFixtures_artworkMetadata
    }
  `
)

const Artist = createFragmentContainer(
  (props: { artist }) => <Text>{props.artist.name}</Text>,
  graphql`
    fragment MockRelayRendererFixtures_artist on Artist {
      name
    }
  `
)

const ArtistQueryRenderer = (props: { id: string }) => (
  <ContextConsumer>
    {({ relayEnvironment }) => {
      return (
        <QueryRenderer
          environment={relayEnvironment}
          variables={props}
          query={graphql`
            query MockRelayRendererFixturesArtistQuery($id: String!) {
              artist(id: $id) {
                ...MockRelayRendererFixtures_artist
              }
            }
          `}
          render={renderWithLoadProgress(Artist as any)}
        />
      )
    }}
  </ContextConsumer>
)

export const query = graphql`
  query MockRelayRendererFixturesQuery {
    artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

// Bad query has a misnamed top-level property.
export const badQuery = graphql`
  query MockRelayRendererFixturesBadQuery {
    something_that_is_not_expected: artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

export function renderToString(element: JSX.Element) {
  return cheerio.html(render(element))
}
