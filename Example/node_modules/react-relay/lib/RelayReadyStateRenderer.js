/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayReadyStateRenderer
 * 
 */

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = require('react');

var RelayFragmentPointer = require('./RelayFragmentPointer');
var RelayPropTypes = require('./RelayPropTypes');

var StaticContainer = require('react-static-container');

var getRelayQueries = require('./getRelayQueries');
var mapObject = require('fbjs/lib/mapObject');

/**
 * @public
 *
 * RelayReadyStateRenderer synchronously renders a container and query config
 * given `readyState`. The `readyState` must be an accurate representation of
 * the data that currently resides in the supplied `environment`. If you need
 * data to be fetched in addition to rendering, please use `RelayRenderer`.
 *
 * If `readyState` is not supplied, the previously rendered `readyState` will
 * continue to be rendered (or null if there is no previous `readyState`).
 */

var RelayReadyStateRenderer = (function (_React$Component) {
  _inherits(RelayReadyStateRenderer, _React$Component);

  _createClass(RelayReadyStateRenderer, null, [{
    key: 'childContextTypes',
    value: {
      relay: RelayPropTypes.Environment,
      route: RelayPropTypes.QueryConfig.isRequired
    },
    enumerable: true
  }]);

  function RelayReadyStateRenderer(props, context) {
    _classCallCheck(this, RelayReadyStateRenderer);

    _React$Component.call(this, props, context);
    this.state = {
      getContainerProps: createContainerPropsFactory()
    };
  }

  RelayReadyStateRenderer.prototype.getChildContext = function getChildContext() {
    return {
      relay: this.props.environment,
      route: this.props.queryConfig
    };
  };

  RelayReadyStateRenderer.prototype.render = function render() {
    var children = undefined;
    var shouldUpdate = false;

    var _props = this.props;
    var readyState = _props.readyState;
    var render = _props.render;

    if (readyState) {
      if (render) {
        children = render({
          done: readyState.done,
          error: readyState.error,
          props: readyState.ready ? this.state.getContainerProps(this.props) : null,
          retry: this.props.retry,
          stale: readyState.stale
        });
      } else if (readyState.ready) {
        var _Container = this.props.Container;

        children = React.createElement(_Container, this.state.getContainerProps(this.props));
      }
      shouldUpdate = true;
    }
    if (children === undefined) {
      children = null;
      shouldUpdate = false;
    }
    return React.createElement(
      StaticContainer,
      { shouldUpdate: shouldUpdate },
      children
    );
  };

  return RelayReadyStateRenderer;
})(React.Component);

function createContainerPropsFactory() {
  var containerProps = undefined;
  var prevProps = undefined;

  function shouldUpdate(nextProps) {
    return !prevProps || !(prevProps.Container === nextProps.Container && prevProps.environment === nextProps.environment && prevProps.queryConfig === nextProps.queryConfig);
  }

  return function (nextProps) {
    if (!containerProps || shouldUpdate(nextProps)) {
      var querySet = getRelayQueries(nextProps.Container, nextProps.queryConfig);
      containerProps = _extends({}, nextProps.queryConfig.params, mapObject(querySet, function (query) {
        return createFragmentPointerForRoot(nextProps.environment, query);
      }));
    }
    prevProps = nextProps;
    return containerProps;
  };
}

function createFragmentPointerForRoot(environment, query) {
  return query ? RelayFragmentPointer.createForRoot(environment.getStoreData().getQueuedStore(), query) : null;
}

module.exports = RelayReadyStateRenderer;