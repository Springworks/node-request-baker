# eslint-plugin-springworks

[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/eslint-plugin-springworks.svg)](https://greenkeeper.io/)

Collection of ESLint rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-springworks`:

```
$ npm install eslint-plugin-springworks --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-springworks` globally.

## Usage

Add `springworks` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "springworks"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "springworks/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





