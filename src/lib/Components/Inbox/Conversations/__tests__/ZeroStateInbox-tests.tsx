import "jest-snapshots-svg"
import * as React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import { Conversations } from "../"

it("looks correct when the user has no conversations", () => {
  const tree = renderer
    .create(<Conversations me={{ conversations: { pageInfo: { hasNextPage: false }, edges: [] } }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it("renders correct when the user has no conversations", () => {
  const tree = renderer
    .create(<Conversations me={{ conversations: { pageInfo: { hasNextPage: false }, edges: [] } }} />)
    .toJSON()
  expect(tree).toMatchSVGSnapshot(480, 1024)
})
