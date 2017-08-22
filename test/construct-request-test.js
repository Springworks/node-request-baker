import { constructRequests } from '../src';
import { ApiBuilder } from '../test-util/api-builder';
describe('test/construct-request-test.js', () => {
  let api;

  beforeEach(() => {
    api = {
      swagger: '2.0',
      info: {
        version: '1.0.0',
        title: 'Swagger Petstore',
        description: 'A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification',
        termsOfService: 'http://swagger.io/terms/',
        contact: {
          name: 'Swagger API Team',
        },
        license: {
          name: 'MIT',
        },
      },
      host: 'petstore.swagger.io',
      basePath: '/api',
      schemes: [
        'http',
      ],
      consumes: [
        'application/json',
      ],
      produces: [
        'application/json',
      ],
      paths: {},
      definitions: {
        Pet: {
          type: 'object',
          required: [
            'id',
            'name',
          ],
          properties: {
            id: {
              type: 'integer',
              format: 'int64',
            },
            name: {
              type: 'string',
            },
            tag: {
              type: 'string',
            },
          },
        },
      },
    };
  });

  describe('API with a single empty path', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/devices/{id}');
    });

    it('should result in no requests', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        actual_requests.length.should.equal(0);
      });
    });

  });

  describe('API with a single path, a single operation with one path parameter', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/devices/{id}')
          .addOperation('get')
          .addPathParameter({ name: 'id', type: 'string' });
    });

    it('should construct a request object with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        const expected_requests = [
          {
            url: `/devices/${getExampleFromType({ type: 'string' })}`,
            method: 'get',
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
          },
        ];
        actual_requests.should.eql(expected_requests);
      });
    });

  });

  describe('API with a single path, a single operation with one query parameter', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/devices')
          .addOperation('get')
          .addQueryParameter({ name: 'id', type: 'string' });
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        const expected_requests = [
          {
            url: '/devices',
            method: 'get',
            body: {},
            headers: {},
            qs: { id: getExampleFromType({ type: 'string' }) },
            base_path: '/api',
          },
        ];
        actual_requests.should.eql(expected_requests);
      });
    });

  });

  describe('API with a single path, a single operation with one header parameter', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/devices')
          .addOperation('get')
          .addHeaderParameter({ name: 'User-Agent', type: 'string' });
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        const expected_requests = [
          {
            url: '/devices',
            method: 'get',
            body: {},
            headers: { 'User-Agent': getExampleFromType({ type: 'string' }) },
            qs: {},
            base_path: '/api',
          },
        ];
        actual_requests.should.eql(expected_requests);
      });
    });

  });

  describe('API with a single path having a single operation with a body parameter', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/users')
          .addOperation('post')
          .addBodyParameter({
            name: 'user',
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
                sex: { type: 'string', enum: ['female', 'male', 'other'] },
              },
            },
          });
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        const expected_requests = [
          {
            url: '/users',
            method: 'post',
            body: {
              name: getExampleFromType({ type: 'string' }),
              age: getExampleFromType({ type: 'integer' }),
              sex: getExampleFromType({ type: 'string', enum: ['female', 'male', 'other'] }),
            },
            headers: {},
            qs: {},
            base_path: '/api',
          },
        ];
        actual_requests.should.eql(expected_requests);
      });
    });

  });

  describe('API with one path having one operation with several parameters', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/users')
          .addOperation('post')
          .addQueryParameter({ name: 'id', type: 'string' })
          .addBodyParameter({
            name: 'user',
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
                sex: { type: 'string', enum: ['female', 'male', 'other'] },
              },
            },
          });
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        const expected_requests = [
          {
            url: '/users',
            method: 'post',
            body: {
              name: getExampleFromType({ type: 'string' }),
              age: getExampleFromType({ type: 'integer' }),
              sex: getExampleFromType({ type: 'string', enum: ['female', 'male', 'other'] }),
            },
            headers: {},
            qs: { id: getExampleFromType({ type: 'string' }) },
            base_path: '/api',
          },
        ];
        actual_requests.should.eql(expected_requests);
      });
    });

  });

  describe('API with one path with several operations', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/devices')
          .addOperation('get')
          .parent
          .addOperation('post')
          .parent
          .addOperation('patch');
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        actual_requests.should.eql([
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'get',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'post',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'patch',
            url: '/devices',
          },
        ]);
      });
    });

  });

  describe('API with several paths with several operations', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/devices')
          .addOperation('get')
          .parent
          .addOperation('post')
          .parent
          .addOperation('patch');
      new ApiBuilder(api)
          .addPath('/users')
          .addOperation('get')
          .parent
          .addOperation('post')
          .parent
          .addOperation('patch');
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        actual_requests.should.eql([
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'get',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'post',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'patch',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'get',
            url: '/users',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'post',
            url: '/users',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'patch',
            url: '/users',
          },
        ]);
      });
    });

  });

  describe('API with several paths with several operations with several parameters', () => {
    beforeEach(() => {
      new ApiBuilder(api)
          .addPath('/users')
          .addOperation('get')
          .addQueryParameter({ name: 'name', type: 'string' })
          .parent
          .addOperation('post')
          .addBodyParameter({
            name: 'user',
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
                sex: { type: 'string', enum: ['female', 'male', 'other'] },
              },
            },
          });
      new ApiBuilder(api)
          .addPath('/devices/{id}')
          .addOperation('get')
          .addPathParameter({ name: 'id', type: 'string' })
          .parent
          .addOperation('delete')
          .addPathParameter({ name: 'id', type: 'string' });
    });

    it('should construct request objects with the correct values', () => {
      return constructRequests(api).then(({ requests: actual_requests, getExampleFromType }) => {
        actual_requests.should.eql([
          {
            body: {},
            qs: { name: getExampleFromType({ type: 'string' }) },
            base_path: '/api',
            headers: {},
            method: 'get',
            url: '/users',
          },
          {
            body: {
              age: 0,
              name: getExampleFromType({ type: 'string' }),
              sex: 'female',
            },
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'post',
            url: '/users',
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'get',
            url: `/devices/${getExampleFromType({ type: 'string' })}`,
          },
          {
            body: {},
            headers: {},
            qs: {},
            base_path: '/api',
            method: 'delete',
            url: `/devices/${getExampleFromType({ type: 'string' })}`,
          },
        ]);
      });
    });

  });

});

