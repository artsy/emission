import 'react-native'

import * as React from 'react'
import { renderWithLayout } from '../../../tests/render_with_layout'

import InfiniteScrollArtworksGrid from '../infinite_scroll_grid'

jest.mock('../../../metaphysics.ts')
jest.mock('../../opaque_image_view.tsx', () => 'AROpaqueImageView')
jest.mock('../../spinner.tsx', () => 'ARSpinner')

it('renders properly', () => {
  const artworks = [ artwork(), artwork(), artwork() ]

  const grid = renderWithLayout(<InfiniteScrollArtworksGrid artworks={artworks} />, { width: 768})
  expect(grid).toMatchSnapshot()
})

var artwork = () => {
  return {
    __id: Math.random(),
    title: 'TALKING POLITICS',
    date: '2008',
    sale_message: 'Not for sale',
    is_in_auction: false,
    image: {
      url: 'artsy.net/image-url',
      aspect_ratio: 1.27
    },
    artists: [
      {
        name: 'Jenny Holzer'
      }
    ],
    partner: {
      name: 'Kukje Gallery'
    },
    href: '/artwork/jenny-holzer-talking-politics'
  }
}
