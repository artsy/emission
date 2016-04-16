/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayEnvironment
 * @typechecks
 * 
 */

'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var GraphQLStoreQueryResolver = require('./GraphQLStoreQueryResolver');

var RelayQueryResultObservable = require('./RelayQueryResultObservable');
var RelayStoreData = require('./RelayStoreData');

var forEachRootCallArg = require('./forEachRootCallArg');
var readRelayQueryData = require('./readRelayQueryData');
var relayUnstableBatchedUpdates = require('./relayUnstableBatchedUpdates');
var warning = require('fbjs/lib/warning');

/**
 * @public
 *
 * `RelayEnvironment` is the public API for Relay core. Each instance provides
 * an isolated environment with:
 * - Methods for fetchng and updating data.
 * - An in-memory cache of fetched data.
 * - A configurable network layer for resolving queries/mutations.
 * - A configurable task scheduler to control when internal tasks are executed.
 * - A configurable cache manager for persisting data between sessions.
 *
 * No data or configuration is shared between instances. We recommend creating
 * one `RelayEnvironment` instance per user: client apps may share a single
 * instance, server apps may create one instance per HTTP request.
 */

var RelayEnvironment = (function () {
  function RelayEnvironment() {
    _classCallCheck(this, RelayEnvironment);

    this._storeData = new RelayStoreData();
    this._storeData.getChangeEmitter().injectBatchingStrategy(relayUnstableBatchedUpdates);
  }

  /**
   * @internal
   */

  RelayEnvironment.prototype.getStoreData = function getStoreData() {
    return this._storeData;
  };

  RelayEnvironment.prototype.injectNetworkLayer = function injectNetworkLayer(networkLayer) {
    this._storeData.getNetworkLayer().injectNetworkLayer(networkLayer);
  };

  RelayEnvironment.prototype.injectTaskScheduler = function injectTaskScheduler(scheduler) {
    this._storeData.injectTaskScheduler(scheduler);
  };

  /**
   * Primes the store by sending requests for any missing data that would be
   * required to satisfy the supplied set of queries.
   */

  RelayEnvironment.prototype.primeCache = function primeCache(querySet, callback) {
    return this._storeData.getQueryRunner().run(querySet, callback);
  };

  /**
   * Forces the supplied set of queries to be fetched and written to the store.
   * Any data that previously satisfied the queries will be overwritten.
   */

  RelayEnvironment.prototype.forceFetch = function forceFetch(querySet, callback) {
    return this._storeData.getQueryRunner().forceFetch(querySet, callback);
  };

  /**
   * Reads query data anchored at the supplied data ID.
   */

  RelayEnvironment.prototype.read = function read(node, dataID, options) {
    return readRelayQueryData(this._storeData, node, dataID, options).data;
  };

  /**
   * Reads query data anchored at the supplied data IDs.
   */

  RelayEnvironment.prototype.readAll = function readAll(node, dataIDs, options) {
    var _this = this;

    return dataIDs.map(function (dataID) {
      return readRelayQueryData(_this._storeData, node, dataID, options).data;
    });
  };

  /**
   * Reads query data, where each element in the result array corresponds to a
   * root call argument. If the root call has no arguments, the result array
   * will contain exactly one element.
   */

  RelayEnvironment.prototype.readQuery = function readQuery(root, options) {
    var _this2 = this;

    var queuedStore = this._storeData.getQueuedStore();
    var storageKey = root.getStorageKey();
    var results = [];
    forEachRootCallArg(root, function (_ref) {
      var identifyingArgKey = _ref.identifyingArgKey;

      var data = undefined;
      var dataID = queuedStore.getDataID(storageKey, identifyingArgKey);
      if (dataID != null) {
        data = _this2.read(root, dataID, options);
      }
      results.push(data);
    });
    return results;
  };

  /**
   * Reads and subscribes to query data anchored at the supplied data ID. The
   * returned observable emits updates as the data changes over time.
   */

  RelayEnvironment.prototype.observe = function observe(fragment, dataID) {
    return new RelayQueryResultObservable(this._storeData, fragment, dataID);
  };

  /**
   * @internal
   *
   * Returns a fragment "resolver" - a subscription to the results of a fragment
   * and a means to access the latest results. This is a transitional API and
   * not recommended for general use.
   */

  RelayEnvironment.prototype.getFragmentResolver = function getFragmentResolver(fragment, onNext) {
    return new GraphQLStoreQueryResolver(this._storeData, fragment, onNext);
  };

  /**
   * Adds an update to the store without committing it. The returned
   * RelayMutationTransaction can be committed or rolled back at a later time.
   */

  RelayEnvironment.prototype.applyUpdate = function applyUpdate(mutation, callbacks) {
    mutation.bindEnvironment(this);
    return this._storeData.getMutationQueue().createTransaction(mutation, callbacks);
  };

  /**
   * Adds an update to the store and commits it immediately. Returns
   * the RelayMutationTransaction.
   */

  RelayEnvironment.prototype.commitUpdate = function commitUpdate(mutation, callbacks) {
    var transaction = this.applyUpdate(mutation, callbacks);
    transaction.commit();
    return transaction;
  };

  /**
   * @deprecated
   *
   * Method renamed to commitUpdate
   */

  RelayEnvironment.prototype.update = function update(mutation, callbacks) {
    process.env.NODE_ENV !== 'production' ? warning(false, '`Relay.Store.update` is deprecated. Please use' + ' `Relay.Store.commitUpdate` or `Relay.Store.applyUpdate` instead.') : undefined;
    this.commitUpdate(mutation, callbacks);
  };

  return RelayEnvironment;
})();

module.exports = RelayEnvironment;