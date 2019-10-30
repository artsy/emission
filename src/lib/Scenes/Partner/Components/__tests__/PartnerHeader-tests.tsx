import { Theme } from "@artsy/palette"
import { PartnerHeader_partner } from "__generated__/PartnerHeader_partner.graphql"
import { renderRelayTree } from "lib/tests/renderRelayTree"
import React from "react"
import { graphql } from "react-relay"
import { PartnerHeaderContainer as PartnerHeader } from "../PartnerHeader"

jest.unmock("react-relay")

describe("PartnerHeader", () => {
  const getWrapper = async data =>
    await renderRelayTree({
      Component: ({ partner }) => {
        return (
          <Theme>
            <PartnerHeader partner={partner as PartnerHeader_partner} />
          </Theme>
        )
      },
      query: graphql`
        query PartnerHeaderTestsQuery @raw_response_type {
          partner(id: "gagosian") {
            name
            profile {
              counts {
                follows
              }
            }
            ...PartnerFollowButton_partner
          }
        }
      `,
      mockData: {
        partner: data,
      },
    })

  it("It renders the followers count", async () => {
    const wrapper = await getWrapper(PartnerHeaderFixture)

    expect(wrapper.find("CountText").text()).toContain("136,999 Followers")
  })
})

const PartnerHeaderFixture = {
  name: "Gagosian",
  profile: {
    counts: {
      follows: 136999,
    },
    id: "UHJvZmlsZTo1MTU5ZGE2MjlhNjA4MzI0MzkwMDAwMzU=",
    internalID: "5159da629a60832439000035",
    isFollowed: false,
  },
  internalID: "4d8b92c44eb68a1b2c0004cb",
  slug: "gagosian",
  " $fragmentRefs": null,
  " $refType": null,
}
