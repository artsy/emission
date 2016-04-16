
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
exports.missingFieldArgMessage = missingFieldArgMessage;
exports.missingDirectiveArgMessage = missingDirectiveArgMessage;
exports.ProvidedNonNullArguments = ProvidedNonNullArguments;

var _error = require('../../error');

var _jsutilsKeyMap = require('../../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _typeDefinition = require('../../type/definition');

function missingFieldArgMessage(fieldName, argName, type) {
  return 'Field "' + fieldName + '" argument "' + argName + '" of type "' + type + '" ' + 'is required but not provided.';
}

function missingDirectiveArgMessage(directiveName, argName, type) {
  return 'Directive "@' + directiveName + '" argument "' + argName + '" of type ' + ('"' + type + '" is required but not provided.');
}

/**
 * Provided required arguments
 *
 * A field or directive is only valid if all required (non-null) field arguments
 * have been provided.
 */

function ProvidedNonNullArguments(context) {
  return {
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave: function leave(fieldAST) {
        var fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        var argASTs = fieldAST.arguments || [];

        var argASTMap = (0, _jsutilsKeyMap2['default'])(argASTs, function (arg) {
          return arg.name.value;
        });
        fieldDef.args.forEach(function (argDef) {
          var argAST = argASTMap[argDef.name];
          if (!argAST && argDef.type instanceof _typeDefinition.GraphQLNonNull) {
            context.reportError(new _error.GraphQLError(missingFieldArgMessage(fieldAST.name.value, argDef.name, argDef.type), [fieldAST]));
          }
        });
      }
    },

    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave: function leave(directiveAST) {
        var directiveDef = context.getDirective();
        if (!directiveDef) {
          return false;
        }
        var argASTs = directiveAST.arguments || [];

        var argASTMap = (0, _jsutilsKeyMap2['default'])(argASTs, function (arg) {
          return arg.name.value;
        });
        directiveDef.args.forEach(function (argDef) {
          var argAST = argASTMap[argDef.name];
          if (!argAST && argDef.type instanceof _typeDefinition.GraphQLNonNull) {
            context.reportError(new _error.GraphQLError(missingDirectiveArgMessage(directiveAST.name.value, argDef.name, argDef.type), [directiveAST]));
          }
        });
      }
    }
  };
}