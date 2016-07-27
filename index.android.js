/* @flow */
'use strict';

import Containers from './lib/containers';
import Components from './lib/components';
import Routes from './lib/relay/routes';

import './lib/relay/config';

import { Home } from './lib/app_registry';

export default {
  Containers,
  Components,
  Routes,
};

import { AppRegistry } from 'react-native';

AppRegistry.registerComponent('emission', () => Home );
