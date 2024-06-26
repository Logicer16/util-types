/**
 * @file The eslint config.
 */
// Espree is yet to support import-attributes
// eslint-disable-next-line import/namespace, import/no-deprecated
import {ConfigGenerator} from "@logicer/eslint-plugin";

/**
 * @type {import("@logicer/eslint-plugin").ConfigOptions}
 */
export const options = {
  javascript: true,
  jsdoc: true,
  prettier: true,
  typescript: true
};

const generator = new ConfigGenerator(options);

/**
 * @type {import("eslint").Linter.FlatConfigFileSpec[]}
 */
const ignores = [
  "node_modules/**/*",
  ".type-coverage/**/*",

  "**/.eslint_report.json",
  "**/.eslintcache"
];

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const utilTypesConfigs = [
  {
    languageOptions: {
      ecmaVersion: 2024,
      parserOptions: {
        ecmaVersion: 2024,
        project: ["./tsconfig.json"],
        sourceType: "module"
      }
    },
    settings: {
      "import/parsers": {
        // Temporary until https://github.com/import-js/eslint-plugin-import/pull/2829
        espree: [".js", ".jsx", ".cjs", ".mjs"]
      },
      "import/resolver": {
        typescript: {
          project: ["tsconfig.json"]
        }
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/naming-convention": "off"
    }
  },
  {
    files: ["tests/**/*"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const config = [
  {ignores},
  ...(await generator.config),
  ...utilTypesConfigs,
  ...(await generator.endConfig)
];

export default config;
