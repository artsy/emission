
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.unknownDirectiveMessage = unknownDirectiveMessage;
exports.misplacedDirectiveMessage = misplacedDirectiveMessage;
exports.KnownDirectives = KnownDirectives;

var _error = require('../../error');

var _jsutilsFind = require('../../jsutils/find');

var _jsutilsFind2 = _interopRequireDefault(_jsutilsFind);

var _languageKinds = require('../../language/kinds');

function unknownDirectiveMessage(directiveName) {
  return 'Unknown directive "' + directiveName + '".';
}

function misplacedDirectiveMessage(directiveName, placement) {
  return 'Directive "' + directiveName + '" may not be used on "' + placement + '".';
}

/**
 * Known directives
 *
 * A GraphQL document is only valid if all `@directives` are known by the
 * schema and legally positioned.
 */

function KnownDirectives(context) {
  return {
    Directive: function Directive(node, key, parent, path, ancestors) {
      var directiveDef = (0, _jsutilsFind2['default'])(context.getSchema().getDirectives(), function (def) {
        return def.name === node.name.value;
      });
      if (!directiveDef) {
        context.reportError(new _error.GraphQLError(unknownDirectiveMessage(node.name.value), [node]));
        return;
      }
      var appliedTo = ancestors[ancestors.length - 1];
      switch (appliedTo.kind) {
        case _languageKinds.OPERATION_DEFINITION:
          if (!directiveDef.onOperation) {
            context.reportError(new _error.GraphQLError(misplacedDirectiveMessage(node.name.value, 'operation'), [node]));
          }
          break;
        case _languageKinds.FIELD:
          if (!directiveDef.onField) {
            context.reportError(new _error.GraphQLError(misplacedDirectiveMessage(node.name.value, 'field'), [node]));
          }
          break;
        case _languageKinds.FRAGMENT_SPREAD:
        case _languageKinds.INLINE_FRAGMENT:
        case _languageKinds.FRAGMENT_DEFINITION:
          if (!directiveDef.onFragment) {
            context.reportError(new _error.GraphQLError(misplacedDirectiveMessage(node.name.value, 'fragment'), [node]));
          }
          break;
      }
    }
  };
}