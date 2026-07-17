import { defineConfig } from "eslint/config";

export const baseConfig = defineConfig([
  {
    rules: {
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
