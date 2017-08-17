'use strict';

function autorestoredSandbox() {
  const sandbox = sinon.sandbox.create();
  afterEach(() => sandbox.restore());
  return sandbox;
}

// exported in a way that is compatible with both `require` and `import`
module.exports = autorestoredSandbox;
module.exports.default = autorestoredSandbox;
Object.defineProperty(module.exports, '__esModule', { value: true });
