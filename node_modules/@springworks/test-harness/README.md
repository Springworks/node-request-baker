[![NPM Version](https://img.shields.io/npm/v/@springworks/test-harness.svg?style=flat-square)](https://www.npmjs.org/package/@springworks/test-harness)
[![Build Status](https://img.shields.io/travis/Springworks/node-test-harness.svg?style=flat-square)](https://travis-ci.org/Springworks/node-test-harness)
[![Coverage Status](https://img.shields.io/coveralls/Springworks/node-test-harness.svg?style=flat-square)](https://coveralls.io/r/Springworks/node-test-harness)
[![Dependencies](http://img.shields.io/david/Springworks/node-test-harness.svg?style=flat-square)](https://david-dm.org/Springworks/node-test-harness#view=table)
[![Dev Dependencies](http://img.shields.io/david/dev/Springworks/node-test-harness.svg?style=flat-square&label=dev+dependencies)](https://david-dm.org/Springworks/node-test-harness#info=devDependencies&view=table)
[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/node-test-harness.svg)](https://greenkeeper.io/)


# test-harness

Setup `should` and `sinon` with plugins.

- Add [should](https://www.npmjs.com/package/should) to the global scope.
- Add [sinon](https://www.npmjs.com/package/sinon) to the global scope.
- Install the [should-sinon](https://www.npmjs.com/package/should-sinon) plugin.
- Install the [should-http](https://www.npmjs.com/package/should-http) plugin.


## Install

```
$ npm i -D @springworks/test-harness
```


## Usage

### Test-harness
Require `@springworks/test-harness` using the `--require` option when running tests with mocha.

```
$ mocha --require @springworks/test-harness
```

The `--require` option can be added to a [mocha.opts](http://mochajs.org/#mocha.opts) file.

Example `mocha.opts` file:

```
--ui bdd
--check-leaks
--recursive
--slow 200
--reporter spec
--compilers js:babel/register
--require @springworks/test-harness
```

### Commonly used random identifiers
Require `@springworks/test-harness/test-data-helper` and call the
functions as needed.

## Example test file

No need to require `should`, `sinon` or any of the plugins.

```js
const autorestoredSandbox = require('@springworks/test-harness/autorestored-sandbox');
const api_tester = require('@springworks/test-harness/api-tester');

describe('test-harness', () => {

  const sandbox = autorestoredSandbox();

  describe('globals', () => {

    it('should expose should as a global', () => {
      should.exist(should);
    });

    it('should expose sinon as a global', () => {
      should.exist(sinon);
    });

  });

  describe('asserting sinon fakes', () => {

    it('should use the should-sinon plugin', () => {
      const test_stub = sinon.stub().returns('hello');
      test_stub().should.eql('hello');
      test_stub.should.have.callCount(1);
    });

  });

  describe('asserting promises', () => {

    it('should use the should-promised plugin', () => {
      return Promise.resolve().should.be.fulfilled();
    });

  });

  describe('asserting http requests', () => {

    it('should use the should-http plugin', () => {
      ({ statusCode: 200 }).should.have.status(200);
    });

  });

  describe('run tests against static API', () => {

    api_tester.configureStaticApi(data_store_api_static.createApiServer, config.get('test_helper.data_store_api.port'));

    it('should be able to send request to static API and resolve without issues');

  });

});
```
