
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printSchema = printSchema;
exports.printIntrospectionSchema = printIntrospectionSchema;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsIsNullish = require('../jsutils/isNullish');

var _jsutilsIsNullish2 = _interopRequireDefault(_jsutilsIsNullish);

var _utilitiesAstFromValue = require('../utilities/astFromValue');

var _languagePrinter = require('../language/printer');

var _typeDefinition = require('../type/definition');

function printSchema(schema) {
  return printFilteredSchema(schema, isDefinedType);
}

function printIntrospectionSchema(schema) {
  return printFilteredSchema(schema, isIntrospectionType);
}

function isDefinedType(typename) {
  return !isIntrospectionType(typename) && !isBuiltInScalar(typename);
}

function isIntrospectionType(typename) {
  return typename.indexOf('__') === 0;
}

function isBuiltInScalar(typename) {
  return typename === 'String' || typename === 'Boolean' || typename === 'Int' || typename === 'Float' || typename === 'ID';
}

function printFilteredSchema(schema, typeFilter) {
  var typeMap = schema.getTypeMap();
  var types = _Object$keys(typeMap).filter(typeFilter).sort(function (name1, name2) {
    return name1.localeCompare(name2);
  }).map(function (typeName) {
    return typeMap[typeName];
  });
  return types.map(printType).join('\n\n') + '\n';
}

function printType(type) {
  if (type instanceof _typeDefinition.GraphQLScalarType) {
    return printScalar(type);
  } else if (type instanceof _typeDefinition.GraphQLObjectType) {
    return printObject(type);
  } else if (type instanceof _typeDefinition.GraphQLInterfaceType) {
    return printInterface(type);
  } else if (type instanceof _typeDefinition.GraphQLUnionType) {
    return printUnion(type);
  } else if (type instanceof _typeDefinition.GraphQLEnumType) {
    return printEnum(type);
  }
  (0, _jsutilsInvariant2['default'])(type instanceof _typeDefinition.GraphQLInputObjectType);
  return printInputObject(type);
}

function printScalar(type) {
  return 'scalar ' + type.name;
}

function printObject(type) {
  var interfaces = type.getInterfaces();
  var implementedInterfaces = interfaces.length ? ' implements ' + interfaces.map(function (i) {
    return i.name;
  }).join(', ') : '';
  return 'type ' + type.name + implementedInterfaces + ' {\n' + printFields(type) + '\n' + '}';
}

function printInterface(type) {
  return 'interface ' + type.name + ' {\n' + printFields(type) + '\n' + '}';
}

function printUnion(type) {
  return 'union ' + type.name + ' = ' + type.getPossibleTypes().join(' | ');
}

function printEnum(type) {
  var values = type.getValues();
  return 'enum ' + type.name + ' {\n' + values.map(function (v) {
    return '  ' + v.name;
  }).join('\n') + '\n' + '}';
}

function printInputObject(type) {
  var fieldMap = type.getFields();
  var fields = _Object$keys(fieldMap).map(function (fieldName) {
    return fieldMap[fieldName];
  });
  return 'input ' + type.name + ' {\n' + fields.map(function (f) {
    return '  ' + printInputValue(f);
  }).join('\n') + '\n' + '}';
}

function printFields(type) {
  var fieldMap = type.getFields();
  var fields = _Object$keys(fieldMap).map(function (fieldName) {
    return fieldMap[fieldName];
  });
  return fields.map(function (f) {
    return '  ' + f.name + printArgs(f) + ': ' + f.type;
  }).join('\n');
}

function printArgs(field) {
  if (field.args.length === 0) {
    return '';
  }
  return '(' + field.args.map(printInputValue).join(', ') + ')';
}

function printInputValue(arg) {
  var argDecl = arg.name + ': ' + arg.type;
  if (!(0, _jsutilsIsNullish2['default'])(arg.defaultValue)) {
    argDecl += ' = ' + (0, _languagePrinter.print)((0, _utilitiesAstFromValue.astFromValue)(arg.defaultValue, arg.type));
  }
  return argDecl;
}