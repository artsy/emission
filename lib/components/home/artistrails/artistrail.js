/* @flow */
'use strict';

import Relay from 'react-relay';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import colors from '../../../../data/colors';
import SectionHeader from '../section_header';
import ArtistCard from './artistcard';

class ArtistRail extends React.Component {
  render() {
    return (
      <View>
        <SectionHeader style={styles.header}>Artists To Follow</SectionHeader>
        <ScrollView style={styles.container}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    scrollsToTop={false}>
          <ArtistCard></ArtistCard>
          <ArtistCard></ArtistCard>
          <ArtistCard></ArtistCard>
          <ArtistCard></ArtistCard>
        </ScrollView>
      </View>
    );
  }
}

// margins aren't working here... seem to have to do them in the child components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  }
});

export default ArtistRail;
