"use strict";

const path = require('path');

module.exports = function(context) {

  function getCurrentPath() {
    return path.relative(process.cwd(), context.getFilename());
  }

  function isTopDescribe(n) {
    return n.type === 'ExpressionStatement' &&
           n.expression.type === 'CallExpression' &&
           n.expression.callee.type === 'Identifier' &&
          (n.expression.callee.name === 'describe' || n.expression.callee.name === 'context');
  }

  function getTopDescribeCallExpression(program_node) {
    for (const n of program_node.body) {
      if (isTopDescribe(n)) {
        return n.expression;
      }
    }
    return null;
  }

  return {
    Program: function(program_node) {
      const top_desc = getTopDescribeCallExpression(program_node);
      if (!top_desc || !top_desc.arguments.length) {
        return;
      }

      const arg = top_desc.arguments[0];
      const filepath = getCurrentPath();
      if (arg.type === 'Literal' && arg.value === filepath) {
        return;
      }

      context.report({
        node: arg,
        message: 'Unexpected path in top ' + top_desc.callee.name,
        fix: fixer => fixer.replaceText(arg, '\'' + filepath + '\''),
      });
    },
  };
};

module.exports.schema = [];
