'use strict'

import React from 'react'
import { View } from 'react-native'

import { storiesOf } from '@kadira/react-native-storybook'
import StubContainer from 'react-storybooks-relay-container'

import ArtistArticles from '../lib/components/artist/articles'

storiesOf('Artist Articles')
  .addDecorator((story) => (
    <View style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>{story()}</View>
  ))
  .add('Single Item', () => {
    const props = {
      articles: [{
        thumbnail_title : 'Example Article',
        href: '/artist/glenn-brown',
        id: '1',
        author : { name: 'Made by Orta' },
        thumbnail_image: { url: '' }
      }]
    }
    return <StubContainer Component={ArtistArticles} props={props}/>
  })
  .add('Multiple Items', () => {
    const props = {
      articles: [{
        thumbnail_title : 'Example Article',
        href: '/artist/glenn-brown',
        id: '2',
        author : { name: 'Made by Orta' },
        thumbnail_image: { url: '' }
      }, {
        thumbnail_title : 'Second Article',
        href: '/artist/leda-catunda',
        id: '3',
        author : { name: 'Made by Danger' },
        thumbnail_image: { url: '' }
      }]
    }
    return <StubContainer Component={ArtistArticles} props={props}/>
  })
