import { Serif, Theme } from "@artsy/palette"
import { PartnerOverview_partner } from "__generated__/PartnerOverview_partner.graphql"
import { PartnerOverviewTestsQuery } from "__generated__/PartnerOverviewTestsQuery.graphql"
import { ArtistListItem } from "lib/Components/ArtistListItem"
import { ReadMore } from "lib/Components/ReadMore"
import React from "react"
import { ScrollView } from "react-native"
import { graphql, QueryRenderer, RelayPaginationProp } from "react-relay"
import ReactTestRenderer from "react-test-renderer"
import { useTracking } from "react-tracking"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { ArtistListWrapper, PartnerOverviewFragmentContainer as PartnerOverview } from "../PartnerOverview"

jest.unmock("react-relay")

const trackEvent = jest.fn()

describe("PartnerOverview", () => {
  let environment: ReturnType<typeof createMockEnvironment>
  const TestRenderer = () => (
    <QueryRenderer<PartnerOverviewTestsQuery>
      environment={environment}
      query={graphql`
        query PartnerOverviewTestsQuery @relay_test_operation {
          partner(id: "gagosian") {
            ...PartnerOverview_partner
          }
        }
      `}
      variables={{ hello: true }}
      render={({ props, error }) => {
        if (props) {
          return (
            <Theme>
              <PartnerOverview {...props as any} />
            </Theme>
          )
        } else if (error) {
          console.log(error)
        }
      }}
    />
  )

  beforeEach(() => {
    environment = createMockEnvironment()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders the artists correctly", () => {
    const wrapper = ReactTestRenderer.create(<TestRenderer />)
    environment.mock.resolveMostRecentOperation(operation => {
      const generatedResponse = MockPayloadGenerator.generate(operation, {
        Partner: () => ({
          artists: { edges: [{}, {}, {}] },
        }),
      })
      return generatedResponse
    })
    expect(wrapper.root.findAllByType(ArtistListItem)).toHaveLength(3)
  })

  it("renders paginates through the artists list", () => {
    const wrapper = ReactTestRenderer.create(<TestRenderer />)
    environment.mock.resolveMostRecentOperation(operation => {
      const generatedResponse = MockPayloadGenerator.generate(operation, {
        Partner: () => ({
          artists: { edges: [{}, {}, {}], pageInfo: { endCursor: "1234" } },
        }),
      })
      return generatedResponse
    })

    // This onScroll will mock and call the isCloseToBottom onScroll event in the ScrollView
    wrapper.root.findByType(ScrollView).props.onScroll({
      nativeEvent: { contentOffset: { y: 800 }, contentSize: { height: 500 }, layoutMeasurement: { height: 800 } },
    })

    environment.mock.resolveMostRecentOperation(operation => {
      const generatedResponse = MockPayloadGenerator.generate(operation, {
        Partner: () => ({
          artists: { edges: [{ id: "000" }, { id: "111" }, { id: "2222" }], pageInfo: { endCursor: "3456" } },
        }),
      })
      return generatedResponse
    })
    console.log("wrapper.root.findAllByType(ArtistListWrapper)", wrapper.root.findAllByType(ArtistListWrapper).length)
    // expect(wrapper.root.findAllByType(ArtistListWrapper)).toHaveLength(6)
  })
})

//   const getWrapper = async (partner: Omit<PartnerOverview_partner, " $fragmentRefs">) =>
//     await renderRelayTree({
// Component: (props: any) => {
//   return (
//     <Theme>
//       <PartnerOverview partner={{ ...partner }} relay={{ environment: {} } as RelayPaginationProp} {...props} />
//     </Theme>
//   )
// },
// query: graphql`
//   query PartnerOverviewTestsQuery @raw_response_type {
//     partner(id: "gagosian") {
//       internalID
//       name
//       locations {
//         city
//       }
//       profile {
//         bio
//       }
//       artists: artistsConnection(first: 10) {
//         edges {
//           node {
//             id
//             ...ArtistListItem_artist
//           }
//         }
//       }

//       ...PartnerLocationSection_partner
//     }
//   }
// `,
//       mockData: {
//         partner,
//       },
//     })
//   it("It renders the artists correctly", async () => {
//     const partnerWithArtists = {
//       ...PartnerOverviewFixture,
//       artists: {
//         edges: artists,
//       },
//     }
//     const wrapper = await getWrapper(partnerWithArtists)
//     const lists = wrapper.find(ArtistListItem)
//     expect(lists.length).toBe(3)
//   })

//   it("It renders the ReadMore component correctly", async () => {
//     const partnerWithBio = {
//       ...PartnerOverviewFixture,
//       profile: {
//         bio: "Nullam quis risus eget urna mollis ornare vel eu leo.",
//       },
//     }
//     const wrapper = await getWrapper(partnerWithBio)
//     expect(
//       wrapper
//         .find(ReadMore)
//         .find(Serif)
//         .text()
//     ).toContain("Nullam quis risus")
//   })

//   it("It renders the location text correctly", async () => {
//     const partnerWithBio = {
//       ...PartnerOverviewFixture,
//       profile: {
//         bio: "Nullam quis risus eget urna mollis ornare vel eu leo.",
//       },
//     }
//     const wrapper = await getWrapper(partnerWithBio)
//     expect(
//       wrapper
//         .find(ReadMore)
//         .find(Serif)
//         .text()
//     ).toContain("Nullam quis risus")
//   })
// })
