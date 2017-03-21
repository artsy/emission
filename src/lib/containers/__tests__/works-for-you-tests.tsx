import * as React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import { renderWithLayout } from "../../tests/render_with_layout"
import { WorksForYou } from "../works_for_you"

describe("with notifications", () => {
  it("creates a ListViewDataSource upon instantiation", () => {
    const worksForYou = new WorksForYou(notificationsResponse())
    expect(worksForYou.state.dataSource).toBeTruthy()
  })

  it("lays out correctly on small screens", () => {
    const me = notificationsResponse().me
    const component = renderWithLayout(<WorksForYou me={me}/>, {width: 100})
    expect(component).toMatchSnapshot()
  })

  it("lays out correctly on larger screens", () => {
    const me = notificationsResponse().me
    const component = renderWithLayout(<WorksForYou me={me}/>, {width: 700})
    expect(component).toMatchSnapshot()
  })
})

describe("without notifications", () => {
  it("does not create a ListViewDataSource", () => {
    const worksForYou = new WorksForYou(emptyStateResponse())
    expect(worksForYou.state.dataSource).toBeFalsy()
  })

  it("lays out correctly on small screens", () => {
    const me = emptyStateResponse().me
    const component = renderWithLayout(<WorksForYou me={me}/>, {width: 100})
    expect(component).toMatchSnapshot()
  })

  it("lays out correctly on larger screens", () => {
    const me = emptyStateResponse().me
    const component = renderWithLayout(<WorksForYou me={me}/>, { width: 700 })
    expect(component).toMatchSnapshot()
  })
})

let notificationsResponse = () => {
  return {
    me: {
      notifications_connection: {
        edges: [
          {
            node: {
              artists: "Jean-Michel Basquiat",
              date: "Mar 16",
              message: "1 Work Added",
              artworks: [ { title: "Anti-Product Postcard" } ],
              image: {
                resized: {
                  url: "cloudfront.url",
                },
              },
            },
          },
          {
            node: {
              artists: "Ana Mendieta",
              date: "Mar 16",
              message: "2 Works Added",
              artworks: [ { title: "Corazón de Roca con Sangre" }, { title: "Butterfly" } ],
              image: {
                resized: {
                  url: "cloudfront.url",
                },
              },
            },
          },
        ],
      },
    },
  }
}

let emptyStateResponse = () => {
  return {
    me: {
      notifications_connection: {
        edges: [],
      },
    },
  }
}
