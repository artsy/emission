import { ShowFixture } from "lib/__fixtures__/ShowFixture"
import React from "react"
import "react-native"
import { RelayProp } from "react-relay"
import * as renderer from "react-test-renderer"
import { ShowHeader } from "../index"

it("looks correct when rendered", () => {
  const onViewAllArtistsPressed = () => {
    /** noop */
  }

  const comp = renderer.create(
    <ShowHeader
      relay={{ environment: {} } as RelayProp}
      show={ShowFixture as any}
      onViewAllArtistsPressed={onViewAllArtistsPressed}
    />
  )
  expect(comp).toMatchSnapshot()
})
