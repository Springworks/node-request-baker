"use strict";

module.exports = {
  meta: {
    fixable: "code",
    schema: []
  },
  create: function(context) {
    return {
      "CallExpression[callee.type=MemberExpression][callee.object.name=/[Ll]og/][callee.property.name='formatPayload']": function(node) {
        context.report({
          node: node,
          message: "Use of the formatPayload function from @springworks/logger-factory",
          fix: function(fixer) {
            return fixer.replaceText(node, context.getSourceCode().getText(node.arguments[0]));
          }
        });
      }
    };
  }
};
