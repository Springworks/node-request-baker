import SwaggerParser from 'swagger-parser';

const params_map = {
  string: {
    default: 'generated_string',
    password: 'generated_string',
    date: '2017-01-23T00:00:00Z',
    'date-time': '2017-01-23T00:00:00Z',
    byte: 'YSBiYXNlNjQgZW5jb2RlZCBzdHJpbmc=',
    binary: '00000000',
    email: 'hello@world.ai',
  },
  integer: {
    default: 0,
    int32: 0,
    int64: 0,
  },
  number: {
    default: 0.0,
    float: 0.0,
    double: 0.0,
  },
  boolean: {
    default: true,
  },
};

function defaultGenerator(path_param) {
  if (path_param.schema) {
    return defaultGenerator(path_param.schema);
  }

  if (path_param.type === 'array') {
    return [...defaultGenerator(path_param.items)];
  }

  if (path_param.type === 'object') {
    const prop_keys = Object.keys(path_param.properties);
    const object_value = {};
    prop_keys.forEach(prop_key => {
      object_value[prop_key] = defaultGenerator(path_param.properties[prop_key]);
    });
    return object_value;
  }

  if (path_param.enum && path_param.enum.length > 0) {
    return path_param.enum[0];
  }
  if (!params_map[path_param.type]) {
    throw new Error(`Unsupported type: ${path_param.type}`);
  }
  return params_map[path_param.type][path_param.format ? path_param.format : 'default'];
}

function constructRequest(path, method, operation_object, generate) {
  const path_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'path') : [];
  let new_path = path;
  path_params.forEach(path_param => {
    new_path = new_path.replace(`{${path_param.name}}`, generate(path_param));
  });

  const query_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'query') : [];

  const qs = {};
  query_params.forEach((query_param, idx) => {
    qs[query_param.name] = generate(query_param);
  });

  const body_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'body') : [];

  let body = {};
  if (body_params.length > 0) {
    body = generate(body_params[0]);
  }

  const headers = {};
  const header_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'header') : [];
  header_params.forEach(header_param => {
    headers[header_param.name] = generate(header_param);
  });

  return {
    url: new_path,
    method,
    body,
    headers,
    qs,
  };
}

export async function constructRequests(swagger_spec, generator = defaultGenerator) {
  const validated_spec = await SwaggerParser.validate(swagger_spec);
  const resolved_spec = await SwaggerParser.dereference(validated_spec);
  const paths = Object.keys(resolved_spec.paths);
  const requests = [];
  paths.forEach(path => {
    const path_object = resolved_spec.paths[path];
    const operation_object_keys = Object.keys(path_object);
    operation_object_keys.forEach(operation_object_key => {
      const operation_object = path_object[operation_object_key];
      requests.push(constructRequest(path, operation_object_key, operation_object, generator));
    });
  });
  return { requests, generator };
}
