import { Box, Theme } from "@artsy/palette"
import React from "react"
import * as renderer from "react-test-renderer"

describe("testing", () => {
  it("does it work", () => {
    const component = renderer
      .create(
        <Theme>
          <Box bg="black10">hi</Box>
        </Theme>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
