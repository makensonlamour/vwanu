/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    jest: true,
    browser: true,
    amd: false,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended" // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }]
  }
};
