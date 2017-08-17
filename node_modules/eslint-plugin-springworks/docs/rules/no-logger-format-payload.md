# Remove use of the `formatPayload` function (no-logger-format-payload)

This rule is meant to help us remove all usage of `logger.formatPayload(data)`.

This rule is fixable. Use `--fix`...

## Examples

```js
logger.info(logger.formatPayload({ foo: 123 }), 'my log message');
// will be transformed to:
logger.info({ foo: 123 }, 'my log message');
```

```js
foo_logger.info(foo_logger.formatPayload({ foo: 123 }), 'my log message');
// will be transformed to:
foo_logger.info({ foo: 123 }, 'my log message');
```

```js
const payload = logger.formatPayload({ foo: 123 });
logger.info(payload, 'my log message');
// will be transformed to:
const payload = { foo: 123 };
logger.info(payload, 'my log message');
```

## Examples of valid code

These will not trigger the linter

```js
logger.info({ foo: 123 }, 'my log message');

const fn = logger.formatPayload;

someOtherThing.formatPayload({});

formatPayload({});
```
