import React from "react"
import * as renderer from "react-test-renderer"

import { BiddingThemeProvider } from "../BiddingThemeProvider"
import { Input } from "../Input"

it("renders properly", () => {
  const bg = renderer
    .create(
      <BiddingThemeProvider>
        <Input placeholder="Placeholder" />
      </BiddingThemeProvider>
    )
    .toJSON()

  expect(bg).toMatchSnapshot()
})
