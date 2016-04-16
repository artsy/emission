
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _definition = require('./definition');

var _scalars = require('./scalars');

/**
 * Directives are used by the GraphQL runtime as a way of modifying execution
 * behavior. Type system creators will usually not create these directly.
 */

var GraphQLDirective = function GraphQLDirective(config) {
  _classCallCheck(this, GraphQLDirective);

  this.name = config.name;
  this.description = config.description;
  this.args = config.args || [];
  this.onOperation = Boolean(config.onOperation);
  this.onFragment = Boolean(config.onFragment);
  this.onField = Boolean(config.onField);
};

exports.GraphQLDirective = GraphQLDirective;

/**
 * Used to conditionally include fields or fragments
 */
var GraphQLIncludeDirective = new GraphQLDirective({
  name: 'include',
  description: 'Directs the executor to include this field or fragment only when ' + 'the `if` argument is true.',
  args: [{ name: 'if',
    type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
    description: 'Included when true.' }],
  onOperation: false,
  onFragment: true,
  onField: true
});

exports.GraphQLIncludeDirective = GraphQLIncludeDirective;
/**
 * Used to conditionally skip (exclude) fields or fragments
 */
var GraphQLSkipDirective = new GraphQLDirective({
  name: 'skip',
  description: 'Directs the executor to skip this field or fragment when the `if` ' + 'argument is true.',
  args: [{ name: 'if',
    type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
    description: 'Skipped when true.' }],
  onOperation: false,
  onFragment: true,
  onField: true
});
exports.GraphQLSkipDirective = GraphQLSkipDirective;