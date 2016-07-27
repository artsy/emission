// @flow
'use strict';

import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { RootContainer } from 'react-relay';

import Spinner from './components/spinner';
import Containers from './containers';
import Routes from './relay/routes';

export class Artist extends React.Component {
  render() {
    const artistRoute:Artist = new Routes.Artist({ artistID: this.props.artistID });

    // https://facebook.github.io/relay/docs/guides-root-container.html
    return (<RootContainer
             Component={Containers.Artist}
             route={artistRoute}
             renderLoading={() => {
               return <Spinner style={{ flex: 1 }} />;
             }}
             renderFailure={(error, retry) => {
               return (<Text>Failed to load.</Text>);
             }}
           />);
  }
}

export class Home extends React.Component {
  render() {
    const homeRoute = new Routes.Home();

    return (<RootContainer
              Component={Containers.Home}
              route={homeRoute}
              renderLoading={() => {
               return <Spinner style={{ flex: 1 }} />;
             }}
             renderFailure={(error, retry) => {
               return (<Text>Failed to load.</Text>);
             }}
           />);
  }
}

AppRegistry.registerComponent('Artist', () => Artist);
AppRegistry.registerComponent('Home', () => Home);
