import { MockRelayRenderer } from "lib/tests/MockRelayRenderer"
import { renderUntil } from "lib/tests/renderUntil"
import React from "react"
import { graphql } from "react-relay"
import { FairFixture } from "../__fixtures__"
import { Fair, FairContainer as FairScreen } from "../Fair"
import { FairMoreInfoContainer as FairMoreInfoScreen } from "../Screens/FairMoreInfo"

jest.unmock("react-relay")

describe("Fair", () => {
  let tree
  beforeAll(async () => {
    tree = await renderUntil(
      wrapper => {
        return wrapper.find("FairHeader").length > 0
      },
      <MockRelayRenderer
        Component={FairScreen}
        query={graphql`
          query FairTestsQuery {
            fair(id: "sofa-chicago-2018") {
              ...Fair_fair
            }
          }
        `}
        mockResolvers={{
          Fair: () => FairFixture,
        }}
      />
    )
  })

  it("renders properly", () => {
    expect(tree.html()).toMatchSnapshot()
  })

  it("handles navigation to FairMoreInfo", () => {
    const mockedPush = jest.fn()
    tree.find(Fair).instance().navigator = { push: mockedPush }

    const button = tree.find("FairHeader").find("[text='View more information']")
    button.props().onPress()

    expect(mockedPush).toHaveBeenCalledWith(
      expect.objectContaining({
        component: FairMoreInfoScreen,
      })
    )
  })
})
