/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayRenderer
 * @typechecks
 * 
 */

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var React = require('react');

var RelayPropTypes = require('./RelayPropTypes');

var RelayReadyStateRenderer = require('./RelayReadyStateRenderer');

var getRelayQueries = require('./getRelayQueries');

var PropTypes = React.PropTypes;

var INACTIVE_READY_STATE = {
  aborted: false,
  done: false,
  error: null,
  ready: false,
  stale: false
};

/**
 * @public
 *
 * RelayRenderer renders a container and query config after fulfilling its data
 * dependencies. Precise rendering behavior is configured via the `render` prop
 * which takes a callback.
 *
 * The container created using `Relay.createContainer` must be supplied via the
 * `Container` prop, and the query configuration that conforms to the shape of a
 * `RelayQueryConfig` must be supplied via the `queryConfig` prop.
 *
 * === Render Callback ===
 *
 * The `render` callback is called with an object with the following properties:
 *
 *   props: ?{[propName: string]: mixed}
 *     If present, sufficient data is ready to render the container. This object
 *     must be spread into the container using the spread attribute operator. If
 *     absent, there is insufficient data to render the container.
 *
 *   done: boolean
 *     Whether all data dependencies have been fulfilled. If `props` is present
 *     but `done` is false, then sufficient data is ready to render, but some
 *     data dependencies have not yet been fulfilled.
 *
 *   error: ?Error
 *     If present, an error occurred while fulfilling data dependencies. If
 *     `props` and `error` are both present, then sufficient data is ready to
 *     render, but an error occurred while fulfilling deferred dependencies.
 *
 *   retry: ?Function
 *     A function that can be called to re-attempt to fulfill data dependencies.
 *     This property is only present if an `error` has occurred.
 *
 *   stale: boolean
 *     When `forceFetch` is enabled, a request is always made to fetch updated
 *     data. However, if all data dependencies can be immediately fulfilled, the
 *     `props` property will be present. In this case, `stale` will be true.
 *
 * The `render` callback can return `undefined` to continue rendering the last
 * view rendered (e.g. when transitioning from one `queryConfig` to another).
 *
 * If a `render` callback is not supplied, the default behavior is to render the
 * container if data is available, the existing view if one exists, or nothing.
 *
 * === Refs ===
 *
 * References to elements rendered by the `render` callback can be obtained by
 * using the React `ref` prop. For example:
 *
 *   <FooComponent {...props} ref={handleFooRef} />
 *
 *   function handleFooRef(component) {
 *     // Invoked when `<FooComponent>` is mounted or unmounted. When mounted,
 *     // `component` will be the component. When unmounted, `component` will
 *     // be null.
 *   }
 *
 */

var RelayRenderer = (function (_React$Component) {
  _inherits(RelayRenderer, _React$Component);

  function RelayRenderer(props, context) {
    _classCallCheck(this, RelayRenderer);

    _React$Component.call(this, props, context);
    var garbageCollector = this.props.environment.getStoreData().getGarbageCollector();
    this.gcHold = garbageCollector && garbageCollector.acquireHold();
    this.mounted = true;
    this.pendingRequest = null;
    this.state = {
      active: false,
      readyState: null,
      retry: this._retry.bind(this)
    };
  }

  RelayRenderer.prototype.componentDidMount = function componentDidMount() {
    this._runQueries(this.props);
  };

  /**
   * @private
   */

  RelayRenderer.prototype._runQueries = function _runQueries(_ref) {
    var _this = this;

    var Container = _ref.Container;
    var forceFetch = _ref.forceFetch;
    var onForceFetch = _ref.onForceFetch;
    var onPrimeCache = _ref.onPrimeCache;
    var queryConfig = _ref.queryConfig;
    var environment = _ref.environment;

    var onReadyStateChange = function onReadyStateChange(readyState) {
      if (!_this.mounted) {
        _this._handleReadyStateChange(_extends({}, readyState, { mounted: false }));
        return;
      }
      if (request !== _this.pendingRequest) {
        // Ignore (abort) ready state if we have a new pending request.
        return;
      }
      if (readyState.aborted || readyState.done || readyState.error) {
        _this.pendingRequest = null;
      }
      _this.setState({
        active: true,
        readyState: _extends({}, readyState, {
          mounted: true
        })
      });
    };

    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }

    var querySet = getRelayQueries(Container, queryConfig);
    var request = this.pendingRequest = forceFetch ? onForceFetch ? onForceFetch(querySet, onReadyStateChange) : environment.forceFetch(querySet, onReadyStateChange) : onPrimeCache ? onPrimeCache(querySet, onReadyStateChange) : environment.primeCache(querySet, onReadyStateChange);
  };

  /**
   * @private
   */

  RelayRenderer.prototype._retry = function _retry() {
    var readyState = this.state.readyState;

    if (readyState && readyState.error) {
      this._runQueries(this.props);
      this.setState({ readyState: null });
    }
  };

  RelayRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.Container !== this.props.Container || nextProps.environment !== this.props.environment || nextProps.queryConfig !== this.props.queryConfig || nextProps.forceFetch && !this.props.forceFetch) {
      if (nextProps.environment !== this.props.environment) {
        if (this.gcHold) {
          this.gcHold.release();
        }
        var garbageCollector = nextProps.environment.getStoreData().getGarbageCollector();
        this.gcHold = garbageCollector && garbageCollector.acquireHold();
      }
      this._runQueries(nextProps);
      this.setState({ readyState: null });
    }
  };

  RelayRenderer.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // `prevState` should exist; the truthy check is for Flow soundness.
    var readyState = this.state.readyState;

    if (readyState) {
      if (!prevState || readyState !== prevState.readyState) {
        this._handleReadyStateChange(readyState);
      }
    }
  };

  /**
   * @private
   */

  RelayRenderer.prototype._handleReadyStateChange = function _handleReadyStateChange(readyState) {
    var onReadyStateChange = this.props.onReadyStateChange;

    if (onReadyStateChange) {
      onReadyStateChange(readyState);
    }
  };

  RelayRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }
    if (this.gcHold) {
      this.gcHold.release();
    }
    this.gcHold = null;
    this.mounted = false;
  };

  RelayRenderer.prototype.render = function render() {
    var readyState = this.state.active ? this.state.readyState : INACTIVE_READY_STATE;

    return React.createElement(RelayReadyStateRenderer, {
      Container: this.props.Container,
      environment: this.props.environment,
      queryConfig: this.props.queryConfig,
      readyState: readyState,
      render: this.props.render,
      retry: this.state.retry
    });
  };

  return RelayRenderer;
})(React.Component);

RelayRenderer.propTypes = {
  Container: RelayPropTypes.Container,
  forceFetch: PropTypes.bool,
  onReadyStateChange: PropTypes.func,
  queryConfig: RelayPropTypes.QueryConfig.isRequired,
  environment: RelayPropTypes.Environment,
  render: PropTypes.func
};

module.exports = RelayRenderer;