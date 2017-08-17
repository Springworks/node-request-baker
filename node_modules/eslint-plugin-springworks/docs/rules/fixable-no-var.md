# Convert var to let (fixable-no-var)

Same as the built-in [`no-var`](http://eslint.org/docs/rules/no-var) rule but can also "fix" the code by replacing `var` with `let`.


## Rule Details

When run with the `--fix` flag it will transform the following code

```js
var x = 1,
    y = 2,
    z;

var foo = 'bar';
```

into:

```js
let x = 1,
    y = 2,
    z;

let foo = 'bar';
```
