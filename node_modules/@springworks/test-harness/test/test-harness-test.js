const autorestoredSandbox = require('../autorestored-sandbox');

describe('test/test-harness-test.js', () => {

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

  describe('stubbing promises', () => {

    it('should use the sinon-as-promised plugin', done => {
      const test_stub = sinon.stub().resolves('foo');
      test_stub().then(value => {
        value.should.equal('foo');
        done();
      });
    });

  });

  describe('asserting http requests', () => {

    it('should use the should-http plugin', () => {
      ({ statusCode: 200 }).should.have.status(200);
    });

  });

  describe('autorestoredSandbox', () => {
    const fn = x => x;
    const obj = { fn: fn };
    const sandbox = autorestoredSandbox();

    it('should return a new sandbox', () => {
      sandbox.spy.should.be.a.Function();
      sandbox.stub.should.be.a.Function();
    });

    describe('with a spy created from the sandbox', () => {

      ['first', 'second', 'third'].forEach(ordinal => {
        it('should restore the spy after the ' + ordinal + ' test case', () => {
          obj.fn.should.equal(fn);
          obj.fn.should.not.have.property('callCount');
          sandbox.spy(obj, 'fn');
          obj.fn.should.not.equal(fn);
          obj.fn(ordinal).should.equal(ordinal);
          obj.fn.should.have.callCount(1);
          obj.fn.should.be.alwaysCalledWithExactly(ordinal);
        });
      });

    });

  });

});
