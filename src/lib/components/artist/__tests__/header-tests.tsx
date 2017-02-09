import { NativeModules } from 'react-native'

import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Header from '../header'

// jest.mock('../../spinner.tsx', () => 'ARSpinner')

beforeAll(() => {
  NativeModules.ARTemporaryAPIModule = { followStatusForArtist: jest.fn() }
})

it('renders properly', () => {
  const artist = {
      name: 'Marcel Duchamp',
      nationality: 'French',
      birthday: '11/17/1992',
      counts: {
        follows: 22,
      }
  }
  const header = renderer.create(<Header artist={artist} />).toJSON()
  expect(header).toMatchSnapshot()
})
