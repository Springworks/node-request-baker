import { constructRequests } from '../src';
import { ApiBuilder } from '../test-util/api-builder';

describe('test/construct-requests-test.js', () => {
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        const expected_requests = [
          {
            url: `/devices/${generator({ type: 'string' })}`,
            method: 'get',
            body: {},
            headers: {},
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        const expected_requests = [
          {
            url: `/devices?id=${generator({ type: 'string' })}`,
            method: 'get',
            body: {},
            headers: {},
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        const expected_requests = [
          {
            url: '/devices',
            method: 'get',
            body: {},
            headers: { 'User-Agent': generator({ type: 'string' }) },
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        const expected_requests = [
          {
            url: '/users',
            method: 'post',
            body: {
              name: generator({ type: 'string' }),
              age: generator({ type: 'integer' }),
              sex: generator({ type: 'string', enum: ['female', 'male', 'other'] }),
            },
            headers: {},
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        const expected_requests = [
          {
            url: `/users?id=${generator({ type: 'string' })}`,
            method: 'post',
            body: {
              name: generator({ type: 'string' }),
              age: generator({ type: 'integer' }),
              sex: generator({ type: 'string', enum: ['female', 'male', 'other'] }),
            },
            headers: {},
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        actual_requests.should.eql([
          {
            body: {},
            headers: {},
            method: 'get',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            method: 'post',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        actual_requests.should.eql([
          {
            body: {},
            headers: {},
            method: 'get',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            method: 'post',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            method: 'patch',
            url: '/devices',
          },
          {
            body: {},
            headers: {},
            method: 'get',
            url: '/users',
          },
          {
            body: {},
            headers: {},
            method: 'post',
            url: '/users',
          },
          {
            body: {},
            headers: {},
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
      return constructRequests(api).then(({ requests: actual_requests, generator }) => {
        actual_requests.should.eql([
          {
            body: {},
            headers: {},
            method: 'get',
            url: '/users?name=generated_string',
          },
          {
            body: {
              age: 0,
              name: 'generated_string',
              sex: 'female',
            },
            headers: {},
            method: 'post',
            url: '/users',
          },
          {
            body: {},
            headers: {},
            method: 'get',
            url: '/devices/generated_string',
          },
          {
            body: {},
            headers: {},
            method: 'delete',
            url: '/devices/generated_string',
          },
        ]);
      });
    });

  });

});

