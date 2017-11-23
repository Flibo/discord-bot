module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
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