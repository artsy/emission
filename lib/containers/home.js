/* @flow */
'use strict';

import Relay from 'react-relay';
import React from 'react';
import { ScrollView, View, Dimensions, Text } from 'react-native';

import Spinner from '../components/spinner';
import GenericArtworksGrid from '../components/artist/artworks/generic_grid';

class Home extends React.Component {
  componentDidMount() {
    this.props.relay.setVariables({ fetchContent: true });
  }

  renderModuleResults(mod) {
    if (mod.results) {
      const artworks = mod.results.slice(0, 8);
      return <GenericArtworksGrid artworks={artworks} />
    } else {
      return <Spinner style={{ flex: 1 }} />;
    }
    return null;
  }

  renderModule(mod) {
    // Compose key, because there may be several generic gene rails.
    const key = mod.key + ((mod.params && mod.params.id) || '');
    return (
      <View style={{ margin: 20}} key={key}>
        <Text>{mod.title}</Text>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          {this.renderModuleResults(mod)}
        </View>
      </View>
      );
  }

  // TODO Right now metaphysics only returns artworks, but there will be artists rails.
  render() {
    return (
      <ScrollView>
        { this.renderModule(this.props.home.modules[0]) }
      </ScrollView>
    );
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {
    fetchContent: false,
  },

  fragments: {
    home: () => Relay.QL`
      fragment on HomePage {
        modules {
          key
          title
          params {
            id
          }
          results @include(if: $fetchContent) {
            __id
            title
            ${GenericArtworksGrid.getFragment('artworks')}
          }
        }
      }
    `,
  }
})