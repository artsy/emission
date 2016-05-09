'use strict';

var fs = require('fs'),
    path = require('path'),
    should = require('should'),
    removeMd = require('../'),
    markdown = fs.readFileSync(path.resolve(__dirname, 'markdown.md')).toString(),
    result = fs.readFileSync(path.resolve(__dirname, 'result.txt')).toString();

describe('remove-markdown', function () {
  it('should remove markdown', function () {
    removeMd(markdown).should.eql(result);
  });
});