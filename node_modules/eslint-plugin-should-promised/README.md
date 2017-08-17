[![NPM Version](https://img.shields.io/npm/v/eslint-plugin-should-promised.svg?style=flat)](https://www.npmjs.org/package/eslint-plugin-should-promised)
[![Build Status](https://img.shields.io/travis/dbrockman/eslint-plugin-should-promised.svg?style=flat)](https://travis-ci.org/dbrockman/eslint-plugin-should-promised)
[![Coverage Status](https://img.shields.io/coveralls/dbrockman/eslint-plugin-should-promised.svg?style=flat)](https://coveralls.io/r/dbrockman/eslint-plugin-should-promised)
[![Peer Dependencies](http://img.shields.io/david/peer/dbrockman/eslint-plugin-should-promised.svg?style=flat)](https://david-dm.org/dbrockman/eslint-plugin-should-promised#info=peerDependencies&view=table)


# eslint-plugin-should-promised

Eslint rule for checking that should-promised assertions return


## Install

```
$ npm i -D eslint-plugin-should-promised
```


## Configure

```json
{
  "plugins": [
    "should-promised"
  ],
  "rules": {
    "should-promised/return-promise": 2
  }
}
```


## Rules

### Require promise assertions to return or await (return-promise)

This rule is intended to be used with the [should](https://www.npmjs.com/package/should) assertion library.

When testing an async function by returning a promise to [mocha](https://www.npmjs.com/package/mocha) it is important to remember to actually return the promise. Forgetting to return will cause the test case to pass even if the promise is eventually rejected.

This rule will point out when a [should](https://www.npmjs.com/package/should) assertion is made without returning.

#### Rule Details

This rule looks for any of the properties `Promise`, `fulfilled`, `fulfilledWith`, `rejected`, `rejectedWith`, `finally` and `eventually`.

The following patterns are considered warnings:

```js
describe('forgetting to return the promise', () => {

  it('should report when not returning the promise from should.be.fulfilled', () => {
    promiseFn().should.be.fulfilled();
  });

  it('should report when not returning the promise from should.eventually', () => {
    promiseFn().should.eventually.eql(1);
  });

});
```

These patterns would not be considered warnings:

```js
describe('returning the promise', () => {

  it('should not report when returning the promise from should.be.fulfilled', () => {
    return promiseFn().should.be.fulfilled();
  });

  it('should allow implicit return in a single expression arrow function', () =>
    promiseFn().should.be.fulfilled());

  it('should not report when using async/await', async () => {
    await promiseFn().should.eventually.eql(expected_value);
  });

  it('should not report when using a generator function', function * () {
    yield generatorFn().should.eventually.eql(expected_value);
  });

});
```

#### Further Reading

- The [should](https://www.npmjs.com/package/should) assertion library
