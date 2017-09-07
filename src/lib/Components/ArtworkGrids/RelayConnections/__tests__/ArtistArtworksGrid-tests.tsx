import "react-native"

import * as React from "react"
import { renderWithLayout } from "../../../../tests/renderWithLayout"

import artwork from "../../__tests__/__fixtures__/artwork"
import ArtistForSaleArtworksGrid from "../ArtistForSaleArtworksGrid"

it("renders properly", () => {
  const artist = {
    artworks: {
      edges: [artwork(), artwork(), artwork()],
    },
  }

  const grid = renderWithLayout(<ArtistForSaleArtworksGrid artist={artist} queryKey="artist" />, { width: 768 })
  expect(grid).toMatchSnapshot()
})
