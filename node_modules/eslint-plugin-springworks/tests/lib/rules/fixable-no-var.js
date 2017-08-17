"use strict";

var rule = require("../../../lib/rules/fixable-no-var");
var RuleTester = require("eslint").RuleTester;


var ruleTester = new RuleTester();
ruleTester.run("fixable-no-var", rule, {

  valid: [
    {
      code: "let x = 1;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "const x = 1;",
      parserOptions: { ecmaVersion: 6 }
    },
  ],

  invalid: [
    {
      code: "var x = 1;",
      output: "let x = 1;",
      errors: [expectedError()],
    },
    {
      code: "var x = 1, y = 2;",
      output: "let x = 1, y = 2;",
      errors: [expectedError()],
    },
    {
      code: "var x = 1, y = 2;",
      output: "let x = 1, y = 2;",
      errors: [expectedError()],
    },
    {
      code: "var x;",
      output: "let x;",
      errors: [expectedError()],
    },
    {
      code: "var x = 1, y;",
      output: "let x = 1, y;",
      errors: [expectedError()],
    },
    {
      code: "var x = 1; var y = 2;",
      output: "let x = 1; let y = 2;",
      errors: [expectedError(), expectedError()],
    },
  ],
});

function expectedError() {
  return {
    message: "VariableDeclaration var can be replaced with let.",
    type: "VariableDeclaration"
  };
}
