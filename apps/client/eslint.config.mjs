import { configs } from '@client/eslint';
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  ...configs.base,

  {
    rules: {
      // Nuxt-specific overrides can be added here if needed
    },
  },
])