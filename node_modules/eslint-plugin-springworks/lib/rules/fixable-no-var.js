"use strict";

module.exports = function(context) {

  return {
    "VariableDeclaration": function(node) {
      if (node.kind === "var") {
        context.report({
          node: node,
          message: "VariableDeclaration var can be replaced with let.",
          fix: function(fixer) {
            var start = node.range[0];
            var range = [start, start + 3];
            return fixer.replaceTextRange(range, "let");
          }
        });
      }
    }
  };

};

module.exports.schema = [];
