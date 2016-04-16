/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayMutationTransaction
 * @typechecks
 * 
 */

'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var RelayMutationTransactionStatus = require('./RelayMutationTransactionStatus');

var invariant = require('fbjs/lib/invariant');

/**
 * @internal
 */

var RelayMutationTransaction = (function () {
  function RelayMutationTransaction(mutationQueue, id) {
    _classCallCheck(this, RelayMutationTransaction);

    this._id = id;
    this._mutationQueue = mutationQueue;
  }

  RelayMutationTransaction.prototype.applyOptimistic = function applyOptimistic() {
    var status = this.getStatus();
    !(status === RelayMutationTransactionStatus.CREATED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationTransaction: Only transactions with status `CREATED` ' + 'can be applied.') : invariant(false) : undefined;

    this._mutationQueue.applyOptimistic(this._id);
  };

  RelayMutationTransaction.prototype.commit = function commit() {
    var status = this.getStatus();
    !(status === RelayMutationTransactionStatus.CREATED || status === RelayMutationTransactionStatus.UNCOMMITTED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationTransaction: Only transactions with status `CREATED` or ' + '`UNCOMMITTED` can be committed.') : invariant(false) : undefined;

    this._mutationQueue.commit(this._id);
  };

  RelayMutationTransaction.prototype.recommit = function recommit() {
    var status = this.getStatus();
    !(status === RelayMutationTransactionStatus.CREATED || status === RelayMutationTransactionStatus.COMMIT_FAILED || status === RelayMutationTransactionStatus.COLLISION_COMMIT_FAILED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationTransaction: Only transaction with status ' + '`CREATED`, `COMMIT_FAILED`, or `COLLISION_COMMIT_FAILED` can be ' + 'recomitted.') : invariant(false) : undefined;

    this._mutationQueue.commit(this._id);
  };

  RelayMutationTransaction.prototype.rollback = function rollback() {
    var status = this.getStatus();
    !(status === RelayMutationTransactionStatus.CREATED || status === RelayMutationTransactionStatus.UNCOMMITTED || status === RelayMutationTransactionStatus.COMMIT_FAILED || status === RelayMutationTransactionStatus.COLLISION_COMMIT_FAILED || status === RelayMutationTransactionStatus.COMMIT_QUEUED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationTransaction: Only transactions with status `CREATED`, ' + '`UNCOMMITTED`, `COMMIT_FAILED`, `COLLISION_COMMIT_FAILED`, or ' + '`COMMIT_QUEUED` can be rolled back.') : invariant(false) : undefined;

    this._mutationQueue.rollback(this._id);
  };

  RelayMutationTransaction.prototype.getError = function getError() {
    return this._mutationQueue.getError(this._id);
  };

  RelayMutationTransaction.prototype.getStatus = function getStatus() {
    return this._mutationQueue.getStatus(this._id);
  };

  RelayMutationTransaction.prototype.getHash = function getHash() {
    return this._id + ':' + this.getStatus();
  };

  return RelayMutationTransaction;
})();

module.exports = RelayMutationTransaction;