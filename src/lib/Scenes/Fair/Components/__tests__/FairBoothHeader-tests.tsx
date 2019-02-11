import { Theme } from "@artsy/palette"
import { FairBoothShowFixture } from "lib/__fixtures__/FairBoothShowFixture"
import { MockRelayRenderer } from "lib/tests/MockRelayRenderer"
import { renderUntil } from "lib/tests/renderUntil"
import React from "react"
import { graphql } from "react-relay"
import { FairBoothHeaderContainer as FairBoothHeader } from "../FairBoothHeader"

jest.unmock("react-relay")

const render = () =>
  renderUntil(
    wrapper => {
      return wrapper.text().includes("Follow gallery")
    },
    <MockRelayRenderer
      Component={({ show }) => (
        <Theme>
          <FairBoothHeader onTitlePressed={jest.fn()} show={show} onSaveShowPressed={jest.fn()} />
        </Theme>
      )}
      query={graphql`
        query FairBoothHeaderTestsQuery {
          show(id: "anderson-fine-art-gallery-flickinger-collection") {
            ...FairBoothHeader_show
          }
        }
      `}
      mockResolvers={{
        Show: () => FairBoothShowFixture,
      }}
    />
  )

describe("FairBoothHeader", () => {
  it("Renders the Fair Booth Header", async () => {
    const tree = await render()
    expect(tree.html()).toMatchSnapshot()
  })

  it("Renders the fair and partner names", async () => {
    const tree = await render()

    expect(tree.text()).toContain(FairBoothShowFixture.partner.name)
    expect(tree.text()).toContain(FairBoothShowFixture.fair.name)
  })
})
