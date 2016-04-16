
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Produces a new schema given an existing schema and a document which may
 * contain GraphQL type extensions and definitions. The original schema will
 * remain unaltered.
 *
 * Because a schema represents a graph of references, a schema cannot be
 * extended without effectively making an entire copy. We do not know until it's
 * too late if subgraphs remain unchanged.
 *
 * This algorithm copies the provided schema, applying extensions while
 * producing the copy. The original schema remains unaltered.
 */
'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.extendSchema = extendSchema;

var _jsutilsInvariant = require('../jsutils/invariant');

var _jsutilsInvariant2 = _interopRequireDefault(_jsutilsInvariant);

var _jsutilsKeyMap = require('../jsutils/keyMap');

var _jsutilsKeyMap2 = _interopRequireDefault(_jsutilsKeyMap);

var _jsutilsKeyValMap = require('../jsutils/keyValMap');

var _jsutilsKeyValMap2 = _interopRequireDefault(_jsutilsKeyValMap);

var _valueFromAST = require('./valueFromAST');

var _errorGraphQLError = require('../error/GraphQLError');

var _typeSchema = require('../type/schema');

var _typeDefinition = require('../type/definition');

var _typeScalars = require('../type/scalars');

var _languageKinds = require('../language/kinds');

function extendSchema(schema, documentAST) {
  (0, _jsutilsInvariant2['default'])(schema instanceof _typeSchema.GraphQLSchema, 'Must provide valid GraphQLSchema');

  (0, _jsutilsInvariant2['default'])(documentAST && documentAST.kind === _languageKinds.DOCUMENT, 'Must provide valid Document AST');

  // Collect the type definitions and extensions found in the document.
  var typeDefinitionMap = {};
  var typeExtensionsMap = {};

  for (var i = 0; i < documentAST.definitions.length; i++) {
    var def = documentAST.definitions[i];
    switch (def.kind) {
      case _languageKinds.OBJECT_TYPE_DEFINITION:
      case _languageKinds.INTERFACE_TYPE_DEFINITION:
      case _languageKinds.ENUM_TYPE_DEFINITION:
      case _languageKinds.UNION_TYPE_DEFINITION:
      case _languageKinds.SCALAR_TYPE_DEFINITION:
      case _languageKinds.INPUT_OBJECT_TYPE_DEFINITION:
        // Sanity check that none of the defined types conflict with the
        // schema's existing types.
        var typeName = def.name.value;
        if (schema.getType(typeName)) {
          throw new _errorGraphQLError.GraphQLError('Type "' + typeName + '" already exists in the schema. It cannot also ' + 'be defined in this type definition.', [def]);
        }
        typeDefinitionMap[typeName] = def;
        break;
      case _languageKinds.TYPE_EXTENSION_DEFINITION:
        // Sanity check that this type extension exists within the
        // schema's existing types.
        var extendedTypeName = def.definition.name.value;
        var existingType = schema.getType(extendedTypeName);
        if (!existingType) {
          throw new _errorGraphQLError.GraphQLError('Cannot extend type "' + extendedTypeName + '" because it does not ' + 'exist in the existing schema.', [def.definition]);
        }
        if (!(existingType instanceof _typeDefinition.GraphQLObjectType)) {
          throw new _errorGraphQLError.GraphQLError('Cannot extend non-object type "' + extendedTypeName + '".', [def.definition]);
        }
        var extensions = typeExtensionsMap[extendedTypeName];
        if (extensions) {
          extensions.push(def);
        } else {
          extensions = [def];
        }
        typeExtensionsMap[extendedTypeName] = extensions;
        break;
    }
  }

  // If this document contains no new types, then return the same unmodified
  // GraphQLSchema instance.
  if (_Object$keys(typeExtensionsMap).length === 0 && _Object$keys(typeDefinitionMap).length === 0) {
    return schema;
  }

  // A cache to use to store the actual GraphQLType definition objects by name.
  // Initialize to the GraphQL built in scalars. All functions below are inline
  // so that this type def cache is within the scope of the closure.
  var typeDefCache = {
    String: _typeScalars.GraphQLString,
    Int: _typeScalars.GraphQLInt,
    Float: _typeScalars.GraphQLFloat,
    Boolean: _typeScalars.GraphQLBoolean,
    ID: _typeScalars.GraphQLID
  };

  // Get the root Query, Mutation, and Subscription types.
  var queryType = getTypeFromDef(schema.getQueryType());

  var existingMutationType = schema.getMutationType();
  var mutationType = existingMutationType ? getTypeFromDef(existingMutationType) : null;

  var existingSubscriptionType = schema.getSubscriptionType();
  var subscriptionType = existingSubscriptionType ? getTypeFromDef(existingSubscriptionType) : null;

  // Iterate through all types, getting the type definition for each, ensuring
  // that any type not directly referenced by a field will get created.
  _Object$keys(schema.getTypeMap()).forEach(function (typeName) {
    return getTypeFromDef(schema.getType(typeName));
  });

  // Do the same with new types.
  _Object$keys(typeDefinitionMap).forEach(function (typeName) {
    return getTypeFromAST(typeDefinitionMap[typeName]);
  });

  // Then produce and return a Schema with these types.
  return new _typeSchema.GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    // Copy directives.
    directives: schema.getDirectives()
  });

  // Below are functions used for producing this schema that have closed over
  // this scope and have access to the schema, cache, and newly defined types.

  function getTypeFromDef(typeDef) {
    var type = _getNamedType(typeDef.name);
    (0, _jsutilsInvariant2['default'])(type, 'Invalid schema');
    return type;
  }

  function getTypeFromAST(astNode) {
    var type = _getNamedType(astNode.name.value);
    if (!type) {
      throw new _errorGraphQLError.GraphQLError('Unknown type: "' + astNode.name.value + '". Ensure that this type exists ' + 'either in the original schema, or is added in a type definition.', [astNode]);
    }
    return type;
  }

  // Given a name, returns a type from either the existing schema or an
  // added type.
  function _getNamedType(typeName) {
    var cachedTypeDef = typeDefCache[typeName];
    if (cachedTypeDef) {
      return cachedTypeDef;
    }

    var existingType = schema.getType(typeName);
    if (existingType) {
      var typeDef = extendType(existingType);
      typeDefCache[typeName] = typeDef;
      return typeDef;
    }

    var typeAST = typeDefinitionMap[typeName];
    if (typeAST) {
      var typeDef = buildType(typeAST);
      typeDefCache[typeName] = typeDef;
      return typeDef;
    }
  }

  // Given a type's introspection result, construct the correct
  // GraphQLType instance.
  function extendType(type) {
    if (type instanceof _typeDefinition.GraphQLObjectType) {
      return extendObjectType(type);
    }
    if (type instanceof _typeDefinition.GraphQLInterfaceType) {
      return extendInterfaceType(type);
    }
    if (type instanceof _typeDefinition.GraphQLUnionType) {
      return extendUnionType(type);
    }
    return type;
  }

  function extendObjectType(type) {
    return new _typeDefinition.GraphQLObjectType({
      name: type.name,
      description: type.description,
      interfaces: function interfaces() {
        return extendImplementedInterfaces(type);
      },
      fields: function fields() {
        return extendFieldMap(type);
      }
    });
  }

  function extendInterfaceType(type) {
    return new _typeDefinition.GraphQLInterfaceType({
      name: type.name,
      description: type.description,
      fields: function fields() {
        return extendFieldMap(type);
      },
      resolveType: throwClientSchemaExecutionError
    });
  }

  function extendUnionType(type) {
    return new _typeDefinition.GraphQLUnionType({
      name: type.name,
      description: type.description,
      types: type.getPossibleTypes().map(getTypeFromDef),
      resolveType: throwClientSchemaExecutionError
    });
  }

  function extendImplementedInterfaces(type) {
    var interfaces = type.getInterfaces().map(getTypeFromDef);

    // If there are any extensions to the interfaces, apply those here.
    var extensions = typeExtensionsMap[type.name];
    if (extensions) {
      extensions.forEach(function (extension) {
        extension.definition.interfaces.forEach(function (namedType) {
          var interfaceName = namedType.name.value;
          if (interfaces.some(function (def) {
            return def.name === interfaceName;
          })) {
            throw new _errorGraphQLError.GraphQLError('\'Type "' + type.name + '" already implements "' + interfaceName + '". ' + 'It cannot also be implemented in this type extension.', [namedType]);
          }
          interfaces.push(getTypeFromAST(namedType));
        });
      });
    }

    return interfaces;
  }

  function extendFieldMap(type) {
    var newFieldMap = {};
    var oldFieldMap = type.getFields();
    _Object$keys(oldFieldMap).forEach(function (fieldName) {
      var field = oldFieldMap[fieldName];
      newFieldMap[fieldName] = {
        description: field.description,
        deprecationReason: field.deprecationReason,
        type: extendFieldType(field.type),
        args: (0, _jsutilsKeyMap2['default'])(field.args, function (arg) {
          return arg.name;
        }),
        resolve: throwClientSchemaExecutionError
      };
    });

    // If there are any extensions to the fields, apply those here.
    var extensions = typeExtensionsMap[type.name];
    if (extensions) {
      extensions.forEach(function (extension) {
        extension.definition.fields.forEach(function (field) {
          var fieldName = field.name.value;
          if (oldFieldMap[fieldName]) {
            throw new _errorGraphQLError.GraphQLError('Field "' + type.name + '.' + fieldName + '" already exists in the ' + 'schema. It cannot also be defined in this type extension.', [field]);
          }
          newFieldMap[fieldName] = {
            type: buildFieldType(field.type),
            args: buildInputValues(field.arguments),
            resolve: throwClientSchemaExecutionError
          };
        });
      });
    }

    return newFieldMap;
  }

  function extendFieldType(type) {
    if (type instanceof _typeDefinition.GraphQLList) {
      return new _typeDefinition.GraphQLList(extendFieldType(type.ofType));
    }
    if (type instanceof _typeDefinition.GraphQLNonNull) {
      return new _typeDefinition.GraphQLNonNull(extendFieldType(type.ofType));
    }
    return getTypeFromDef(type);
  }

  function buildType(typeAST) {
    switch (typeAST.kind) {
      case _languageKinds.OBJECT_TYPE_DEFINITION:
        return buildObjectType(typeAST);
      case _languageKinds.INTERFACE_TYPE_DEFINITION:
        return buildInterfaceType(typeAST);
      case _languageKinds.UNION_TYPE_DEFINITION:
        return buildUnionType(typeAST);
      case _languageKinds.SCALAR_TYPE_DEFINITION:
        return buildScalarType(typeAST);
      case _languageKinds.ENUM_TYPE_DEFINITION:
        return buildEnumType(typeAST);
      case _languageKinds.INPUT_OBJECT_TYPE_DEFINITION:
        return buildInputObjectType(typeAST);
    }
  }

  function buildObjectType(typeAST) {
    return new _typeDefinition.GraphQLObjectType({
      name: typeAST.name.value,
      interfaces: function interfaces() {
        return buildImplementedInterfaces(typeAST);
      },
      fields: function fields() {
        return buildFieldMap(typeAST);
      }
    });
  }

  function buildInterfaceType(typeAST) {
    return new _typeDefinition.GraphQLInterfaceType({
      name: typeAST.name.value,
      fields: function fields() {
        return buildFieldMap(typeAST);
      },
      resolveType: throwClientSchemaExecutionError
    });
  }

  function buildUnionType(typeAST) {
    return new _typeDefinition.GraphQLUnionType({
      name: typeAST.name.value,
      types: typeAST.types.map(getTypeFromAST),
      resolveType: throwClientSchemaExecutionError
    });
  }

  function buildScalarType(typeAST) {
    return new _typeDefinition.GraphQLScalarType({
      name: typeAST.name.value,
      serialize: function serialize() {
        return null;
      },
      // Note: validation calls the parse functions to determine if a
      // literal value is correct. Returning null would cause use of custom
      // scalars to always fail validation. Returning false causes them to
      // always pass validation.
      parseValue: function parseValue() {
        return false;
      },
      parseLiteral: function parseLiteral() {
        return false;
      }
    });
  }

  function buildEnumType(typeAST) {
    return new _typeDefinition.GraphQLEnumType({
      name: typeAST.name.value,
      values: (0, _jsutilsKeyValMap2['default'])(typeAST.values, function (v) {
        return v.name.value;
      }, function () {
        return {};
      })
    });
  }

  function buildInputObjectType(typeAST) {
    return new _typeDefinition.GraphQLInputObjectType({
      name: typeAST.name.value,
      fields: function fields() {
        return buildInputValues(typeAST.fields);
      }
    });
  }

  function buildImplementedInterfaces(typeAST) {
    return typeAST.interfaces.map(getTypeFromAST);
  }

  function buildFieldMap(typeAST) {
    return (0, _jsutilsKeyValMap2['default'])(typeAST.fields, function (field) {
      return field.name.value;
    }, function (field) {
      return {
        type: buildFieldType(field.type),
        args: buildInputValues(field.arguments),
        resolve: throwClientSchemaExecutionError
      };
    });
  }

  function buildInputValues(values) {
    return (0, _jsutilsKeyValMap2['default'])(values, function (value) {
      return value.name.value;
    }, function (value) {
      var type = buildFieldType(value.type);
      return {
        type: type,
        defaultValue: (0, _valueFromAST.valueFromAST)(value.defaultValue, type)
      };
    });
  }

  function buildFieldType(typeAST) {
    if (typeAST.kind === _languageKinds.LIST_TYPE) {
      return new _typeDefinition.GraphQLList(buildFieldType(typeAST.type));
    }
    if (typeAST.kind === _languageKinds.NON_NULL_TYPE) {
      return new _typeDefinition.GraphQLNonNull(buildFieldType(typeAST.type));
    }
    return getTypeFromAST(typeAST);
  }
}

function throwClientSchemaExecutionError() {
  throw new Error('Client Schema cannot be used for execution.');
}