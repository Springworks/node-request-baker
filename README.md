# node-request-bakery
Bakes tasty example request parameters from a Swagger specification.

## Usage 
```javascript
import constructRequests from '@springworks/request-bakery'
const { requests } = constructRequests(swagger_spec);
```

Each `request` has the following structure:
```javascript
{
   url,         //the path e.g. /pets
   base_path    //base path e.g. /api
   method,      //http method e.g. GET
   body,        //the payload
   headers,     //headers e.g. {'X-Request-ID': '77e1c83b-7bb0-437b-bc50-a7a58e5660ac'}
   qs,          //query params e.g. { id: 1, name: 'daisy' }
}
```
