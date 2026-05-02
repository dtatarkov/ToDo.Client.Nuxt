// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
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
      
      // Also consider unused imports as errors
      'import/no-unused-modules': ['error', { suppressMissingFileEnumeratorAPIWarning: true, unusedExports: true }],
    },
  },
)
