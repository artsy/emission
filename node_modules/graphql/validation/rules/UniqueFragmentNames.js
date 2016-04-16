
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.duplicateFragmentNameMessage = duplicateFragmentNameMessage;
exports.UniqueFragmentNames = UniqueFragmentNames;

var _error = require('../../error');

function duplicateFragmentNameMessage(fragName) {
  return 'There can only be one fragment named "' + fragName + '".';
}

/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 */

function UniqueFragmentNames(context) {
  var knownFragmentNames = _Object$create(null);
  return {
    OperationDefinition: function OperationDefinition() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition(node) {
      var fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(new _error.GraphQLError(duplicateFragmentNameMessage(fragmentName), [knownFragmentNames[fragmentName], node.name]));
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}