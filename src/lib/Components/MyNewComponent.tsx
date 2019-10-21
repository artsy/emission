import { Serif } from "@artsy/palette"
import { MyNewComponent_artist } from "__generated__/MyNewComponent_artist.graphql"
import { MyNewComponentQuery } from "__generated__/MyNewComponentQuery.graphql"
import { defaultEnvironment } from "lib/relay/createEnvironment"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer, RelayProp } from "react-relay"
import { RetryErrorBoundary } from "./RetryErrorBoundary"

interface Props {
  artist: MyNewComponent_artist
  relay: RelayProp
}

export class MyNewComponent extends React.Component<Props> {
  render() {
    return <Serif size="3t">Hello {this.props.artist.name}</Serif>
  }
}

export const MyNewComponentFragmentContainer = createFragmentContainer(MyNewComponent, {
  artist: graphql`
    fragment MyNewComponent_artist on Artist {
      name
    }
  `,
})

export const MyNewComponentQueryRenderer: React.SFC<{ artistID: string }> = ({ artistID, ...others }) => {
  console.log({ artistID })
  return (
    <RetryErrorBoundary
      render={() => {
        return (
          <QueryRenderer<MyNewComponentQuery>
            environment={defaultEnvironment}
            query={graphql`
              query MyNewComponentQuery($artistID: String!) {
                artist(id: $artistID) {
                  ...MyNewComponent_artist
                }
              }
            `}
            variables={{
              artistID,
            }}
            render={renderWithLoadProgress(MyNewComponentFragmentContainer, others)}
          />
        )
      }}
    />
  )
}
