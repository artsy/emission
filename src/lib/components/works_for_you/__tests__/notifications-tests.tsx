import * as React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import { renderWithLayout } from "../../../tests/render_with_layout"
import { Notification } from "../notification"

it("lays out correctly for unread notification", () => {
  const props = notification()
  const component = renderWithLayout(<Notification notification={props}/>, { width: 768 })

  expect(component).toMatchSnapshot()
})

it("lays out correctly for read notification", () => {
  const props = notification()
  props.status = "READ"
  const component = renderWithLayout(<Notification notification={props}/>, { width: 768 })

  expect(component).toMatchSnapshot()
})

it("does not show artist avatar if no avatar image exists", () => {
  const props = notification()
  props.image.resized.url = null
  const component = renderWithLayout(<Notification notification={props}/>, { width: 300 })

  expect(component).toMatchSnapshot()
})

let notification = () => {
  return {
    artists: "Jean-Michel Basquiat",
    date: "Mar 16",
    message: "1 Work Added",
    artworks: [ { title: "Anti-Product Postcard" } ],
    status: "UNREAD",
    image: {
      resized: {
        url: "cloudfront.url",
      },
    },
  }
}
