import "react-native"

import * as React from "react"
import * as renderer from "react-test-renderer"

import Metadata from "../metadata"

it("renders properly", () => {
  const show = {
    kind: "solo",
    name: "Expansive Exhibition",
    exhibition_period: "Jan 1 - March 1",
    status_update: "Closing in 2 days",
    status: "running",
    partner: {
      name: "Gallery",
    },
    location: {
      city: "Berlin",
    },
  }
  const metadata = renderer.create(<Metadata show={show} />).toJSON()
  expect(metadata).toMatchSnapshot()
})
