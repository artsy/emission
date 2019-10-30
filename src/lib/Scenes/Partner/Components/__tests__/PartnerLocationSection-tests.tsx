import { Theme } from "@artsy/palette"
import { PartnerLocationSection_partner } from "__generated__/PartnerLocationSection_partner.graphql"
import { renderRelayTree } from "lib/tests/renderRelayTree"
import React from "react"
import { graphql } from "react-relay"
import { PartnerLocationSectionContainer as PartnerLocationSection } from "../PartnerLocationSection"

jest.unmock("react-relay")

const PartnerLocationSectionFixture = {
  internalID: "4d8b92c44eb68a1b2c0004cb",
  name: "Gagosian",
  locations: [],
  " $fragmentRefs": null,
  " $refType": null,
}

describe("PartnerLoationSection", () => {
  const getWrapper = async data =>
    await renderRelayTree({
      Component: ({ partner }) => {
        return (
          <Theme>
            <PartnerLocationSection partner={partner as PartnerLocationSection_partner} />
          </Theme>
        )
      },
      query: graphql`
        query PartnerLocationSectionTestsQuery @raw_response_type {
          partner(id: "gagosian") {
            name
            locations {
              city
            }
          }
        }
      `,
      mockData: {
        partner: data,
      },
    })

  it("It renders the locations text correctly", async () => {
    const partnerWithLocations = {
      ...PartnerLocationSectionFixture,
      locations,
    }
    const wrapper = await getWrapper(partnerWithLocations)
    expect(wrapper.text()).toContain(
      "Gagosian has 11 locations in New York, Beverly Hills, San Francisco, London, Paris, Le Bourget, Geneva, Basel, Rome, Athens and Central, Hong Kong"
    )
  })
})

const locations = [
  {
    city: "New York",
  },
  {
    city: "New York",
  },
  {
    city: "New York",
  },
  {
    city: "New York",
  },
  {
    city: "New York",
  },
  {
    city: "Beverly Hills",
  },
  {
    city: "San Francisco",
  },
  {
    city: "London",
  },
  {
    city: "London",
  },
  {
    city: "London",
  },
  {
    city: "Paris",
  },
  {
    city: "Le Bourget",
  },
  {
    city: "Geneva",
  },
  {
    city: "Basel",
  },
  {
    city: "Rome",
  },
  {
    city: "Athens",
  },
  {
    city: "Central, Hong Kong",
  },
]
