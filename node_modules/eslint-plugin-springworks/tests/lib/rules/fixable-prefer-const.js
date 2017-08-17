"use strict";

var rule = require("../../../lib/rules/fixable-prefer-const");
var RuleTester = require("eslint").RuleTester;


var ruleTester = new RuleTester();
ruleTester.run("fixable-prefer-const", rule, {
  valid: [
    { code: "var x = 0;" },
    { code: "let x;", parserOptions: { ecmaVersion: 6 } },
    { code: "let x; x = 0;", parserOptions: { ecmaVersion: 6 } },
    { code: "let x = 0; x = 1;", parserOptions: { ecmaVersion: 6 } },
    { code: "const x = 0;", parserOptions: { ecmaVersion: 6 } },
    { code: "for (let i = 0, end = 10; i < end; ++i) {}", parserOptions: { ecmaVersion: 6 } },
    { code: "for (let i in [1,2,3]) { i = 0; }", parserOptions: { ecmaVersion: 6 } },
    { code: "for (let x of [1,2,3]) { x = 0; }", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { var x = 0; })();" },
    { code: "(function() { let x; })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { let x; x = 0; })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { let x = 0; x = 1; })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { const x = 0; })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { for (let i = 0, end = 10; i < end; ++i) {} })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { for (let i in [1,2,3]) { i = 0; } })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { for (let x of [1,2,3]) { x = 0; } })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function(x = 0) { })();", parserOptions: { ecmaVersion: 6 } },
    // x is not modified but let cannot be replaced because of y
    { code: "let [x = -1, y] = [1,2]; y = 0;", parserOptions: { ecmaVersion: 6 } },
    { code: "let {a: x = -1, b: y} = {a:1,b:2}; y = 0;", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { let [x = -1, y] = [1,2]; y = 0; })();", parserOptions: { ecmaVersion: 6 } },
    { code: "(function() { let {a: x = -1, b: y} = {a:1,b:2}; y = 0; })();", parserOptions: { ecmaVersion: 6 } }
  ],
  invalid: [
    {
      code: "let x = 1; foo(x);",
      output: "const x = 1; foo(x);",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`x` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "for (let i in [1,2,3]) { foo(i); }",
      output: "for (const i in [1,2,3]) { foo(i); }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`i` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "for (let x of [1,2,3]) { foo(x); }",
      output: "for (const x of [1,2,3]) { foo(x); }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`x` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "(function() { let x = 1; foo(x); })();",
      output: "(function() { const x = 1; foo(x); })();",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`x` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "(function() { for (let i in [1,2,3]) { foo(i); } })();",
      output: "(function() { for (const i in [1,2,3]) { foo(i); } })();",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`i` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "(function() { for (let x of [1,2,3]) { foo(x); } })();",
      output: "(function() { for (const x of [1,2,3]) { foo(x); } })();",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`x` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "let x = 0; { let x = 1; foo(x); } x = 0;",
      output: "let x = 0; { const x = 1; foo(x); } x = 0;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`x` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "for (let i = 0; i < 10; ++i) { let x = 1; foo(x); }",
      output: "for (let i = 0; i < 10; ++i) { const x = 1; foo(x); }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ message: "`x` is never modified, use `const` instead.", type: "Identifier" }]
    },
    {
      code: "for (let i in [1,2,3]) { let x = 1; foo(x); }",
      output: "for (const i in [1,2,3]) { const x = 1; foo(x); }",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        { message: "`i` is never modified, use `const` instead.", type: "Identifier" },
        { message: "`x` is never modified, use `const` instead.", type: "Identifier" }
      ]
    }
  ]
});
