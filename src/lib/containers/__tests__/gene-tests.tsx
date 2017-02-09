import 'react-native'
import * as React from 'react'
import * as renderer from 'react-test-renderer'

import Gene from '../gene'

describe('handling price ranges', () => {
  let gene = null
  beforeAll(() => {
    gene = new Gene(props)
  })

  it('is empty when *-*', () => {
    expect(gene.priceRangeToHumanReadableString('*-*')).toEqual('')
  })

  it('looks right when there is only a min value', () => {
    expect(gene.priceRangeToHumanReadableString('50.00-*')).toEqual('Above $50')
  })

  it('looks right when there is only a max value', () => {
    expect(gene.priceRangeToHumanReadableString('*-100.00')).toEqual('Below $100')
  })

  it('looks right when there is a max and mix value', () => {
    const gene = new Gene()
    expect(gene.priceRangeToHumanReadableString('100.00-10000.00')).toEqual('$100 - $10,000')
  })
})

it('looks like expected', () => {
  const tree = renderer.create(
    <Gene geneID={props.gene.name} gene={props.gene}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

  const props = {
      gene: {
        id: 'An ID',
        _id: 'a UUID',
        name: 'Example Gene',
        description: "Here's some text",
        filtered_artworks: {
            total: 12,
            aggregations: [{
              slice: '1212',
              counts: {
                id: 'OK',
                name: 'Sure',
                count: 'Yep'
              }
            }]
        },
        trending_artists: [
          {
            id: 'an artist',
            name: 'Artist name',
            counts: {
              for_sale_artworks: 1,
              artworks: 2
            },
            image: {
              large_version: ''
            }
          }
        ]
      }
    }