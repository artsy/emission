import 'react-native'
import * as React from 'react'
import { renderWithLayout } from '../../../tests/render_with_layout'

import RelatedArtists from '../'

it('lays out correctly', () => {
  const artists = [ {
    __id: 0,
    name: 'Sarah Scott',
    counts: {
      for_sale_artworks: 2,
      artworks: 4,
    },
  }]

  const layout = { width: 768 }

  const component = renderWithLayout(<RelatedArtists artists={artists}/>, layout)
  expect(component).toMatchSnapshot()
})
