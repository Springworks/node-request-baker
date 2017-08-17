module.exports = {
  "extends": "./index.js",
  "parser": "babel-eslint",
  "plugins": [
    "import"
  ],
  "rules": {
    "import/default": 2,
    "import/export": 2,
    "import/imports-first": 2,
    "import/named": 2,
    "import/namespace": 2,
    "import/no-duplicates": 0,
    "import/no-named-as-default": 2,
    "import/no-require": 0,
    "import/no-unresolved": [2, { "commonjs": true }],

    "no-duplicate-imports": 2,
    "prefer-spread": 2,
    "strict": [1, "never"]
  }
};
