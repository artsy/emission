var fs = require('fs');
var path = require('path');
var getbabelRelayPlugin = require('babel-relay-plugin');
var config = require('../../package.json');

try {
    var schemaPath = path.join(__dirname, '../../', config.metadata.graphql.schema);

    var stats = fs.lstatSync(schemaPath);

    if (stats.isFile()) {
        var schema = require(schemaPath);
    }
}
catch (e) {
    console.log(e);
}

if (schema) {
    console.log(`babel-relay-plugin-loader: using schema at [${schemaPath}]`);
    module.exports = getbabelRelayPlugin(schema.data);
} else {
    console.log(`babel-relay-plugin-loader: no schema found at [${schemaPath}]`);
    console.log('babel-relay-plugin-loader: babel will continue without the babel-relay-plugin!');
    module.exports = function () {
        return {
            visitor: {
            }
        };
    };
}
