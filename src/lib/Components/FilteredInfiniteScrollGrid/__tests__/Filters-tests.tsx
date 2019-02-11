import React from "react"
import { graphql } from "react-relay"

import { ShowFixture } from "../../../__fixtures__/ShowFixture"
import { MockRelayRenderer } from "../../../tests/MockRelayRenderer"
import { renderUntil } from "../../../tests/renderUntil"

import { Picker } from "lib/Components/Picker"
import { PortalProvider } from "lib/Components/Portal"
import { FiltersContainer as Filters } from "../Filters"

jest.unmock("react-relay")

const renderTree = () =>
  renderUntil(
    wrapper => {
      return wrapper.find(Picker).length > 0
    },
    <MockRelayRenderer
      Component={({ show }) => (
        <PortalProvider>
          <Filters
            filteredArtworks={show.filteredArtworks}
            onFilterChange={null}
            mediumValue={""}
            priceRangeValue={""}
          />
        </PortalProvider>
      )}
      query={graphql`
        query FiltersTestsQuery {
          show(id: "anderson-fine-art-gallery-flickinger-collection") {
            filteredArtworks(size: 0, medium: "*", price_range: "*-*", aggregations: [MEDIUM, PRICE_RANGE, TOTAL]) {
              ...Filters_filteredArtworks
            }
          }
        }
      `}
      mockData={{
        data: ShowFixture,
      }}
    />
  )

describe("Filters", () => {
  // TODO: Fix test, it's currently timing out
  xit("Passes Picker Options from available aggregrations", async () => {
    const tree = await renderTree()
    const pickerOptions = tree
      .find(Picker)
      .first()
      .props()
      .options.map(({ text }) => text)

    // First Picker is the "Medium" picker
    const optionsFromFixture = ShowFixture.filteredArtworks.aggregations[1].counts[0].name

    expect(pickerOptions).toContain(optionsFromFixture)
  })
})
