import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Home from '../home'

// jest.mock('../../components/home/artist_rails/artist_rail.tsx', () => 'ArtistRail')
// jest.mock('../../components/home/artwork_rails/artwork_rail.tsx', () => 'ArtworkRail')
// jest.mock('../../components/spinner.tsx', () => 'ARSpinner')
// jest.mock('../../components/opaque_image_view.tsx', () => 'AROpaqueImageView')

describe('upon initialization', () => {
  it('starts with isRefreshing set to false', () => {
    const homeComponent = new Home(homeProps())
    expect(homeComponent.state.isRefreshing).toBeFalsy()
  })

  it('creates a data source with a search bar and hero unit', () => {
    const homeComponent = new Home(homeProps())
    const dataSourceBlob = extractListViewDataBlob(homeComponent)
    const searchBar = { type: 'search_bar', data: null }
    const heroUnits = { type: 'hero_units', data: [] }
    expect(dataSourceBlob).toContainEqual(searchBar)
    expect(dataSourceBlob).toContainEqual(heroUnits)
  })

  it('orders modules correctly', () => {
    const homeComponent = new Home(homeProps(3,3,3))
    const dataSourceBlob = extractListViewDataBlob(homeComponent)
    // order should be search bar, hero units, 2 artwork modules, one artist module
    expect(dataSourceBlob[0].type).toBe('search_bar')
    expect(dataSourceBlob[1].type).toBe('hero_units')
    expect(dataSourceBlob[2].type).toBe('artwork')
    expect(dataSourceBlob[3].type).toBe('artwork')
    expect(dataSourceBlob[4].type).toBe('artist')
  })
})

describe('layout', () => {
  it('renders as expected', () => {
    const homeComponent = renderer.create(<Home home={homeProps(3,3,3).home}/>).toJSON()
    expect(homeComponent).toMatchSnapshot()
  })
})

var homeProps = (nHeroUnits?: number, nArtistModules?: number, nArtworkModules?: number) => {
  return {
      home: {
        hero_units: nHeroUnits ? modulesOfType('hero_units', nHeroUnits) : [],
        artist_modules: nArtistModules ? modulesOfType('artist', nArtistModules) : [],
        artwork_modules: nArtworkModules ? modulesOfType('artwork', nArtworkModules) : [],
        }
    }
}

var modulesOfType = (type: string, count: number) => {
  const modules = []
  for (let i = 0; i < count; i++) {
    modules.push({ title: 'Title', type: type })
  }
  return modules
}

var extractListViewDataBlob = (home: Home) => {
  return home.state.dataSource._dataBlob.s1
}
