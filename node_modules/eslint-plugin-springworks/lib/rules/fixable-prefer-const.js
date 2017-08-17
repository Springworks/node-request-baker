"use strict";


module.exports = function(context) {

  /**
   * Checks whether a reference is the initializer.
   * @param {Reference} reference - A reference to check.
   * @returns {boolean} Whether or not the reference is the initializer.
   */
  function isInitializer(reference) {
    return reference.init === true;
  }

  /**
   * Checks whether a reference is read-only or the initializer.
   * @param {Reference} reference - A reference to check.
   * @returns {boolean} Whether or not the reference is read-only or the initializer.
   */
  function isReadOnlyOrInitializer(reference) {
    return reference.isReadOnly() || reference.init === true;
  }

  /**
   * Searches and reports variables that are never modified after declared.
   * @param {Scope} scope - A scope of the search domain.
   * @returns {void}
   */
  function checkForVariables(scope) {
    // Skip the TDZ type.
    if (scope.type === "TDZ") {
      return;
    }

    var variables = scope.variables;
    for (var i = 0, end = variables.length; i < end; ++i) {
      var variable = variables[i];
      var def = variable.defs[0];
      var declaration = def && def.parent;
      var statement = declaration && declaration.parent;
      var references = variable.references;
      var identifier = variable.identifiers[0];

      if (statement &&
          identifier &&
          declaration.type === "VariableDeclaration" &&
          declaration.kind === "let" &&
          (statement.type !== "ForStatement" || statement.init !== declaration) &&
          references.some(isInitializer) &&
          references.every(isReadOnlyOrInitializer)
      ) {
        var p = identifier;
        while (p && p.type !== 'VariableDeclaration') {
          p = p.parent;
          if (p.type === 'ArrayPattern' || p.type === 'ObjectPattern') {
            // Bail if the var is part of an array or object destruction
            return;
          }
        }
        if (!p || p.declarations.length !== 1) {
          // Bail if the VariableDeclaration has 0 or multiple declarations, e.g. var x = 1, y = 2;
          return;
        }

        context.report({
          node: identifier,
          message: "`{{name}}` is never modified, use `const` instead.",
          data: { name: identifier.name },
          fix: function(fixer) {
            var start = p.range[0];
            var let_length = "let".length;
            var range = [start, start + let_length];
            return fixer.replaceTextRange(range, "const");
          }
        });
      }
    }
  }

  /**
   * Adds multiple items to the tail of an array.
   * @param {any[]} array - A destination to add.
   * @param {any[]} values - Items to be added.
   * @returns {void}
   */
  var pushAll = Function.apply.bind(Array.prototype.push);

  return {
    "Program:exit": function() {
      var stack = [context.getScope()];
      while (stack.length) {
        var scope = stack.pop();
        pushAll(stack, scope.childScopes);

        checkForVariables(scope);
      }
    }
  };

};

module.exports.schema = [];
