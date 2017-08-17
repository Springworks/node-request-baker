# Replace let with const if var is not reassigned (fixable-prefer-const)

This rule is based on [`prefer-const`](http://eslint.org/docs/rules/prefer-const) but implements a `fix` function that replaces `let` with `const` if possible.

If the `--fix` flag is used, `let` will be replaced with `const` if the rule can detect that the var is not modified.

The only


## Rule Details

This rule is aimed at flagging variables that are declared using let keyword, but never modified after the initial assignment.

The following patterns are considered warnings:

```js
let a = 3;               /*error `a` is never modified, use `const` instead.*/
console.log(a);

// `i` is re-defined (not modified) on each loop step.
for (let i in [1,2,3]) {  /*error `i` is never modified, use `const` instead.*/
    console.log(i);
}

// `a` is re-defined (not modified) on each loop step.
for (let a of [1,2,3]) { /*error `a` is never modified, use `const` instead.*/
    console.log(a);
}
```

The following patterns are not warnings:

```js

```
