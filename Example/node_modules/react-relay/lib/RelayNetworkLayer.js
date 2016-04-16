'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var Promise = require('fbjs/lib/Promise');

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayNetworkLayer
 * @typechecks
 * 
 */

'use strict';

var RelayProfiler = require('./RelayProfiler');

var RelayQueryRequest = require('./RelayQueryRequest');

var invariant = require('fbjs/lib/invariant');
var resolveImmediate = require('fbjs/lib/resolveImmediate');

/**
 * @internal
 *
 * `RelayNetworkLayer` provides a method to inject custom network behavior.
 */

var RelayNetworkLayer = (function () {
  function RelayNetworkLayer() {
    _classCallCheck(this, RelayNetworkLayer);

    this._injectedNetworkLayer = null;
    this._queue = null;
  }

  /**
   * Profiles time from request to receiving the first server response.
   */

  RelayNetworkLayer.prototype.injectNetworkLayer = function injectNetworkLayer(networkLayer) {
    this._injectedNetworkLayer = networkLayer;
  };

  RelayNetworkLayer.prototype.sendMutation = function sendMutation(mutationRequest) {
    var networkLayer = this._getCurrentNetworkLayer();
    var promise = networkLayer.sendMutation(mutationRequest);
    if (promise) {
      Promise.resolve(promise).done();
    }
  };

  RelayNetworkLayer.prototype.sendQueries = function sendQueries(queryRequests) {
    var networkLayer = this._getCurrentNetworkLayer();
    var promise = networkLayer.sendQueries(queryRequests);
    if (promise) {
      Promise.resolve(promise).done();
    }
  };

  RelayNetworkLayer.prototype.supports = function supports() {
    var networkLayer = this._getCurrentNetworkLayer();
    return networkLayer.supports.apply(networkLayer, arguments);
  };

  RelayNetworkLayer.prototype._getCurrentNetworkLayer = function _getCurrentNetworkLayer() {
    !this._injectedNetworkLayer ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayNetworkLayer: Use `injectNetworkLayer` to configure a network ' + 'layer.') : invariant(false) : undefined;
    return this._injectedNetworkLayer;
  };

  /**
   * Schedules the supplied `query` to be sent to the server.
   *
   * This is a low-level transport API; application code should use higher-level
   * interfaces exposed by RelayContainer for retrieving data transparently via
   * queries defined on components.
   */

  RelayNetworkLayer.prototype.fetchRelayQuery = function fetchRelayQuery(query) {
    var _this = this;

    var currentQueue = this._queue || [];
    if (!this._queue) {
      this._queue = currentQueue;
      resolveImmediate(function () {
        _this._queue = null;
        profileQueue(currentQueue);
        _this.sendQueries(currentQueue);
      });
    }
    var request = new RelayQueryRequest(query);
    currentQueue.push(request);
    return request.getPromise();
  };

  return RelayNetworkLayer;
})();

function profileQueue(currentQueue) {
  // TODO #8783781: remove aggregate `fetchRelayQuery` profiler
  var firstResultProfiler = RelayProfiler.profile('fetchRelayQuery');
  currentQueue.forEach(function (query) {
    var profiler = RelayProfiler.profile('fetchRelayQuery.query');
    var onSettle = function onSettle() {
      profiler.stop();
      if (firstResultProfiler) {
        firstResultProfiler.stop();
        firstResultProfiler = null;
      }
    };
    query.getPromise().done(onSettle, onSettle);
  });
}

RelayProfiler.instrumentMethods(RelayNetworkLayer.prototype, {
  sendMutation: 'RelayNetworkLayer.sendMutation',
  sendQueries: 'RelayNetworkLayer.sendQueries'
});

module.exports = RelayNetworkLayer;