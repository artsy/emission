/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayFragmentTracker
 * 
 */

'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var RelayFragmentTracker = (function () {
  function RelayFragmentTracker() {
    _classCallCheck(this, RelayFragmentTracker);

    this._dataIDToTrackedFragments = new _Map();
  }

  RelayFragmentTracker.prototype.track = function track(dataID, fragmentHash) {
    var set = this._dataIDToTrackedFragments.get(dataID);
    if (!set) {
      set = new _Set();
      this._dataIDToTrackedFragments.set(dataID, set);
    }
    set.add(fragmentHash);
  };

  RelayFragmentTracker.prototype.isTracked = function isTracked(dataID, fragmentHash) {
    var set = this._dataIDToTrackedFragments.get(dataID);
    return !!set && set.has(fragmentHash);
  };

  RelayFragmentTracker.prototype.untrack = function untrack(dataID) {
    this._dataIDToTrackedFragments['delete'](dataID);
  };

  return RelayFragmentTracker;
})();

module.exports = RelayFragmentTracker;