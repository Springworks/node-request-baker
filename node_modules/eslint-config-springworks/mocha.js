module.exports = {
  "env": {
    "mocha": true
  },
  "plugins": [
    "springworks",
    "mocha"
  ],
  "rules": {
    "springworks/top-describe-path": 2,

    "mocha/handle-done-callback": 2,
    "mocha/no-exclusive-tests": 2,

    "max-nested-callbacks": 0,
    "no-extra-parens": 0,
    "no-sync": 0,
    "no-wrap-func": 0,
    "padded-blocks": 0
  }
};
