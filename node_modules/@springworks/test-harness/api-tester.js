'use strict';

const assert = require('assert');

const api = {

  configureStaticApi(apiServerCreator, port) {
    assert(typeof apiServerCreator === 'function', 'apiServerCreator has to be function to create static api');
    assert(port, 'Port has to be specified');

    let server;

    before(() => {
      return apiServerCreator({ port: port }).then(created_server => {
        server = created_server;
        return server.start();
      });
    });

    after(() => {
      return server.stop();
    });
  },

};

// exported in a way that is compatible with both `require` and `import`
module.exports = api;
module.exports.default = api;
Object.defineProperty(module.exports, '__esModule', { value: true });
