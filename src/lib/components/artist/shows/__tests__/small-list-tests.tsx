import 'react-native'

import * as React from 'react'
import * as renderer from 'react-test-renderer'

import SmallList from '../small_list'
jest.mock('../../../opaque_image_view.tsx', () => 'AROpaqueImageView')

it('renders properly', () => {
  const show1 = showProps()
  var show2 = showProps()
  show2.partner.name = 'A Different Gallery'
  show2.kind = 'fair'

  const shows = [ show1, show2 ]

  const list = renderer.create(<SmallList shows={shows} />).toJSON()
  expect(list).toMatchSnapshot()
})

var showProps = () => {
  return {
    href: 'artsy.net/show',
    cover_image: {
      url: 'artsy.net/image-url'
    },
    kind: 'solo',
    name: 'Expansive Exhibition',
    exhibition_period: 'Jan 1 - March 1',
    status_update: 'Closing in 2 days',
    status: 'running',
    partner: {
      name: 'Gallery'
    },
    location: {
      city: 'Berlin'
    }
  }
}
