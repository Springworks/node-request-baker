# Ensure that the top `describe` or `context` call in each test file use the correct path (top-describe-path)

We use `mocha` in many of our projects and have adopted the convention of using `__filename` as the description in the root `describe` in each test file. That way it's easy to find a failing test.
It is easier and less error-prone to write `__filename` then the actual path.
The downside of using `__filename` is that editors cannot understand where the failing test is located. If every `describe` use a static string then it's possible to jump to a test case.
It also looks a bit ugly with all the absolute paths. It's nicer if they are relative to the project.


## Rule Details

This rule aims to assert that the top `describe` uses the correct relative path.

If the `--fix` flag is used, the correct path is inserted instead of the first argument to `describe`.


The following patterns are considered warnings:

```js
// Use of the __filename identifier
describe(__filename, function() {
});

// Incorrect path
describe('foo', function() {
});
```

The following patterns are not warnings:

```js
describe('tests/lib/rules/top-describe-path.js', function() {

  describe('foo', function() {
  });

});
```

## When Not To Use It

Should only be used in the test dir.
If a project does not use `mocha` with the BDD UI or does not follow this convention then this rule should not be used.
