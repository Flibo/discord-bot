module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "rules": {
    "indent": [
      "error",
        2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
      "off",
    ],
    "no-var": [
      "error"
    ],
    "prefer-const": [
      "error"
    ],
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "no-unused-vars": [
      "error"
    ]
  }
};