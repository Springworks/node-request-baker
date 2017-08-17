"use strict";

var rule = require("../../../lib/rules/no-logger-format-payload");
var RuleTester = require("eslint").RuleTester;

var message = "Use of the formatPayload function from @springworks/logger-factory";

var ruleTester = new RuleTester();
ruleTester.run("no-logger-format-payload", rule, {

  valid: [
    { code: "logger.info({ foo: 123 }, 'my log message');" },
    { code: "var fn = logger.formatPayload" },
    { code: "someOtherThing.formatPayload({})" },
    { code: "formatPayload({})" },
  ],

  invalid: [
    {
      code: "logger.info(logger.formatPayload({ foo: 123 }), 'my log message');",
      output: "logger.info({ foo: 123 }, 'my log message');",
      errors: [{ message: message, type: "CallExpression" }],
    },
    {
      code: "log.info(log.formatPayload({ foo: 123 }), 'my log message');",
      output: "log.info({ foo: 123 }, 'my log message');",
      errors: [{ message: message, type: "CallExpression" }],
    },
    {
      code: "foo_logger.info(foo_logger.formatPayload({ foo: 123 }), 'my log message');",
      output: "foo_logger.info({ foo: 123 }, 'my log message');",
      errors: [{ message: message, type: "CallExpression" }],
    },
    {
      code: "fooLogger.info(fooLogger.formatPayload({ foo: 123 }), 'my log message');",
      output: "fooLogger.info({ foo: 123 }, 'my log message');",
      errors: [{ message: message, type: "CallExpression" }],
    },
    {
      code: "var payload = logger.formatPayload({ foo: 123 }); logger.info(payload, 'my log message');",
      output: "var payload = { foo: 123 }; logger.info(payload, 'my log message');",
      errors: [{ message: message, type: "CallExpression" }],
    },
  ],
});
