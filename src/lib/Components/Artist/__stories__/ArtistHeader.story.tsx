import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { View } from "react-native"
import { Environment, Network, RecordSource, Store } from "relay-runtime"
// import StubContainer from "react-storybooks-relay-container"

import Header from "../Header"

// TODO Move to metametaphysics after Relay Modern migration
import { graphql, QueryRenderer } from "react-relay"
import createEnvironment from "../../../relay/createEnvironment"
const RootContainer: React.SFC<any> = ({ Component, artistID }) => {
  return (
    <QueryRenderer
      environment={createEnvironment()}
      query={graphql`
        query ArtistHeaderQuery($artistID: String!) {
          artist(id: $artistID) {
            ...Header_artist
          }
        }
      `}
      variables={{
        artistID,
      }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
        } else if (props) {
          return <Component {...props} />
        }
        return null
      }}
    />
  )
}

storiesOf("Artist/Header")
  .addDecorator(story =>
    <View style={{ marginLeft: 20, marginRight: 20 }}>
      {story()}
    </View>
  )
  .add("Real Artist - Glenn Brown", () => {
    return <RootContainer Component={Header} artistID="glenn-brown" />
  })
  .add("Real Artist - Leda Catunda", () => {
    return <RootContainer Component={Header} artistID="leda-catunda" />
  })
// TODO Move to metametaphysics after Relay Modern migration
//
// Note that for these two, the follow button / count will remain the
// same as it was from one of the above artists. Once they are in relay/graphQL
// stubbing that data can be a possiblity
// .add("No Birthday", () => {
//   const props = {
//     artist: {
//       name: "Example Data",
//       nationality: "UK",
//       counts: { follows: 12 },
//     },
//   }
//   return <StubContainer Component={Header} props={props} />
// })
// .add("Full Data", () => {
//   const api = {
//     artist: {
//       name: "Another Exmaple",
//       nationality: "OK",
//       birthday: "1999",
//       counts: { follows: 12 },
//     },
//   }
//   return <StubContainer Component={Header} props={api} />
// })
