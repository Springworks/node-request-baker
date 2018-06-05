import SwaggerParser from 'swagger-parser';
import _ from 'lodash';

const params_map = {
  string: {
    default: 'TDbl5kL83bG',
    password: 'TDbl5kL83bG',
    uri: 'https://example.com:9999/foo#bar?q=superman',
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

function getExampleFromTypeDefault({ type, format, enum: enumeration }) {
  const _format = format || 'default';
  if (enumeration) {
    return enumeration[0];
  }
  return params_map[type][_format];
}

function getExampleFromParamObject(param_obj, getExampleFromType) {
  if (param_obj.schema) {
    return getExampleFromParamObject(param_obj.schema, getExampleFromType);
  }

  if (param_obj.type === 'array') {
    return [getExampleFromParamObject(param_obj.items, getExampleFromType)];
  }

  if (param_obj.type === 'object') {
    const object_value = {};
    const filtered_props = _.pickBy(param_obj.properties, p => p.type); //type is not required in JSON schema so skip type-less props
    _.forOwn(filtered_props, (val, key) => {
      object_value[key] = getExampleFromParamObject(val, getExampleFromType);
    });
    return object_value;
  }

  if (!params_map[param_obj.type]) {
    throw new Error(`Unsupported type: ${JSON.stringify(param_obj, null, 2)}`);
  }
  return getExampleFromType({ type: param_obj.type, format: param_obj.format, enum: param_obj.enum });
}

function constructRequest(original_path, method, operation_object, getExampleFromType, base_path) {
  const path_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'path') : [];

  const path = path_params.reduce((accumulated_path, path_param) => {
    return accumulated_path.replace(`{${path_param.name}}`, getExampleFromParamObject(path_param, getExampleFromType));
  }, original_path);

  const query_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'query') : [];

  const qs = {};
  query_params.forEach(query_param => {
    const query_example = getExampleFromParamObject(query_param, getExampleFromType);
    qs[query_param.name] = query_param.type === 'array' ? JSON.stringify(query_example) : query_example;
  });

  const body_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'body') : [];

  let body = {};
  if (body_params.length > 0) {
    body = getExampleFromParamObject(body_params[0], getExampleFromType);
  }

  const headers = {};
  const header_params = operation_object.parameters ? operation_object.parameters.filter(p => p.in === 'header') : [];
  header_params.forEach(header_param => {
    headers[header_param.name] = getExampleFromParamObject(header_param, getExampleFromType);
  });

  return {
    path,
    original_path,
    method,
    body,
    headers,
    qs,
    base_path,
  };
}

export async function constructRequests(swagger_spec, getExampleFromType = getExampleFromTypeDefault) {
  const validated_spec = await SwaggerParser.validate(swagger_spec);
  const resolved_spec = await SwaggerParser.dereference(validated_spec);
  const paths = Object.keys(resolved_spec.paths);
  const requests = _.flatMap(paths, path => {
    const path_object = resolved_spec.paths[path];
    const operation_object_keys = Object.keys(path_object);
    return operation_object_keys.map(operation_object_key => {
      const operation_object = path_object[operation_object_key];
      return constructRequest(path, operation_object_key, operation_object, getExampleFromType, resolved_spec.basePath);
    });
  });
  return { requests, getExampleFromType };
}
