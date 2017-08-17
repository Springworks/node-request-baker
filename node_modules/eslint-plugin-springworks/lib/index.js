"use strict";

var path = require('path');
var requireIndex = require('requireindex');

module.exports.rules = requireIndex(path.join(__dirname, 'rules'));
