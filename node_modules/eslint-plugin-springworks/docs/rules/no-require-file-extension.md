# Disallow .js in relative paths in require or import (no-require-file-extension)

We prefer to not include the ".js" file extension when importing files with a relative path.

This rule will warn when a relative path ends with ".js" in a `require` or an `import`.

If the `--fix` flag is used, ".js" will be removed from the path. This could in some cases cause issues, for example if there is a dir with the same base name.


## Rule Details

This rule aims to help us write consistent import statements

The following patterns are considered warnings:

```js
const foo = require('./foo.js');

import foo from './foo.js';
```

The following patterns are not warnings:

```js
const foo = require('./foo');

import foo from './foo';
```
