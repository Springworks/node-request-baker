import { Spec } from 'swagger-schema-official';

type Primitive = 'integer' | 'boolean' | 'string' | 'number';

interface TypeDescription {
    type: Primitive,
    format: string,
    enumeration: Array<Primitive>
}

interface Request {
    path: string;
    original_path: string;
    method: 'get' | 'post' | 'patch' | 'put' | 'delete';
    body: object;
    headers: object;
    qs: object;
    base_path: string;
}

type TypeToExample = (type: TypeDescription) => number | string | boolean;

interface RequestsResult {
    requests: Request[],
    getExampleFromType: TypeToExample
}

declare async function constructRequests(swagger_spec: Spec, getExampleFromType?: TypeToExample): Promise<RequestsResult>;
