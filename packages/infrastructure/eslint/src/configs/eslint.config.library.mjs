import { baseConfig } from './eslint.config.base.mjs';
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { Linter } from "eslint";
import { defineConfig } from "eslint/config";

export const libraryConfig = defineConfig([
  ...baseConfig,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: {
      js,
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],

    languageOptions: {
      globals: {
        ...globals.browser
      },
    }
  },

  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],

    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    }
  },
  {
    rules: {
      // Enable strict unused variable detection
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': ['error', {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        vars: 'all',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',

      'vue/valid-template-root': 'off',
    },
  },
]);
