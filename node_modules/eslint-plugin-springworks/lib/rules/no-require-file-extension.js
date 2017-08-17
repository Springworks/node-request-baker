"use strict";

module.exports = function(context) {

  function startsWith(string, target) {
    return string.lastIndexOf(target, 0) === 0;
  }

  function endsWith(string, target) {
    var length = string.length;
    var position = length - target.length;
    return position >= 0 && string.indexOf(target, position) === position;
  }

  function checkPath(path) {
    if (path.type !== 'Literal' || typeof path.value !== 'string') {
      return;
    }

    if (!startsWith(path.value, '.') || !endsWith(path.value, '.js')) {
      return;
    }

    context.report({
      node: path,
      message: "Do not include .js in relative paths",
      fix: function(fixer) {
        var end = path.range[1];
        var range = [end - 4, end - 1];
        return fixer.replaceTextRange(range, "");
      }
    });
  }

  return {

    "CallExpression": function(node) {
      if (node.callee.name === "require" && node.arguments.length === 1) {
        checkPath(node.arguments[0]);
      }
    },

    "ImportDeclaration": function(node) {
      if (node.source.type === 'Literal') {
        checkPath(node.source);
      }
    },

  };

};

module.exports.schema = [];
