
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _language = require('../language');

var GraphQLError = (function (_Error) {
  _inherits(GraphQLError, _Error);

  function GraphQLError(message,
  // A flow bug keeps us from declaring nodes as an array of Node
  nodes, /* Node */stack, source, positions) {
    _classCallCheck(this, GraphQLError);

    _get(Object.getPrototypeOf(GraphQLError.prototype), 'constructor', this).call(this, message);
    this.message = message;

    Object.defineProperty(this, 'stack', { value: stack || message });
    Object.defineProperty(this, 'nodes', { value: nodes });

    // Note: flow does not yet know about Object.defineProperty with `get`.
    Object.defineProperty(this, 'source', {
      get: function get() {
        if (source) {
          return source;
        }
        if (nodes && nodes.length > 0) {
          var node = nodes[0];
          return node && node.loc && node.loc.source;
        }
      }
    });

    Object.defineProperty(this, 'positions', {
      get: function get() {
        if (positions) {
          return positions;
        }
        if (nodes) {
          var nodePositions = nodes.map(function (node) {
            return node.loc && node.loc.start;
          });
          if (nodePositions.some(function (p) {
            return p;
          })) {
            return nodePositions;
          }
        }
      }
    });

    Object.defineProperty(this, 'locations', {
      get: function get() {
        var _this = this;

        if (this.positions && this.source) {
          return this.positions.map(function (pos) {
            return (0, _language.getLocation)(_this.source, pos);
          });
        }
      }
    });
  }

  return GraphQLError;
})(Error);

exports.GraphQLError = GraphQLError;