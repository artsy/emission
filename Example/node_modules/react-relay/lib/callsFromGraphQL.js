/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule callsFromGraphQL
 * 
 * @typechecks
 */

'use strict';

var invariant = require('fbjs/lib/invariant');

/**
 * @internal
 *
 * Convert from GraphQL call nodes to plain object `{name,value}` calls.
 */
function callsFromGraphQL(concreteCalls, variables) {
  // $FlowIssue: ConcreteCall should flow into CallOrDirective
  var callsOrDirectives = concreteCalls;
  var orderedCalls = [];
  for (var ii = 0; ii < callsOrDirectives.length; ii++) {
    var callOrDirective = callsOrDirectives[ii];
    var _value = callOrDirective.value;

    if (_value != null) {
      if (Array.isArray(_value)) {
        _value = _value.map(function (arg) {
          return getCallValue(arg, variables);
        });
      } else if (_value.kind === 'BatchCallVariable') {
        // Batch calls are handled separately
        _value = null;
      } else {
        _value = getCallValue(_value, variables);
      }
    }
    orderedCalls.push({ name: callOrDirective.name, value: _value });
  }
  return orderedCalls;
}

function getCallValue(concreteValue, variables) {
  var callValue = undefined;
  if (concreteValue.kind === 'CallValue') {
    callValue = concreteValue.callValue;
  } else {
    var variableName = concreteValue.callVariableName;
    !variables.hasOwnProperty(variableName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'callsFromGraphQL(): Expected a declared value for variable, `$%s`.', variableName) : invariant(false) : undefined;
    callValue = variables[variableName];
  }
  // Perform a shallow check to ensure the value conforms to `CallValue` type:
  // For performance reasons, skip recursively testing array/object values.
  var valueType = typeof callValue;
  !(callValue == null || valueType === 'boolean' || valueType === 'number' || valueType === 'string' || valueType === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'callsFromGraphQL(): Expected argument value `%s` to either be null or a ' + 'boolean, number, string, or array/object.', JSON.stringify(callValue)) : invariant(false) : undefined;
  return callValue;
}

module.exports = callsFromGraphQL;