// /* eslint-disable prettier/prettier */
// module.exports = {
//   root: true,
//    parser: "@babel/eslint-parser",
//   parserOptions: {
//     ecmaVersion: 2020,
//     requireConfigFile: false,
//     sourceType: "module",
//      allowImportExportEverywhere: true,
//     ecmaFeatures: {
//       jsx: true
//     },
//     babelOptions: {
//       presets: ["@babel/preset-react"]
//     }

//   },
//   settings: {
//     react: {
//       version: "detect"
//     }
//   },
//   env: {
//     jest: true,
//     browser: true,
//     amd: false,
//     node: true
//   },

//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:prettier/recommended" // Make this the last element so prettier config overrides other formatting rules
//   ],
//   rules: {
//     "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
//     "prettier/prettier": ["error", { endOfLine: "auto" }, { usePrettierrc: true }]
//   }
// };

module.exports = {
  root: true,
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    jest: true,
    browser: true,
    amd: false,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended", "react-app", "react-app/jest"],
  rules: {
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
  },
};
