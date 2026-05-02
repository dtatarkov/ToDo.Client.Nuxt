import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  css: ['@/assets/css/main.css'],

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  typescript: {
    tsConfig: {
      include: [
        "../.storybook/**/*",
      ]
    }
  },

  ui: {
    // @ts-expect-error some typing issue. object configuration with preference key is absolutely valid
    colorMode: process.env.NUXT_ALLOW_COLOR_MODE === 'true' ? {
      preference: 'dark'
    } : false,
    // Only include the components we actually use
    components: {
      include: [
        'UApp',
        'UModal',
        'UForm',
        'UFormField',
        'UCard',
        'UButton',
        'UInput',
        'UTextarea',
        'UInputDate',
        'UInputTime'
      ]
    },
    // Disable safelist colors to reduce CSS size
    safelistColors: false
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      locale: 'ru',
      longTaskSpinnerDelay: 500 // ms
    },
  },

  experimental: {
    decorators: true,
  },

  hooks: {
    'prepare:types'({ tsConfig })
    {
      const aliasesToRemoveFromAutocomplete = ['~', '~/*', '~~', '~~/*'];

      for (const alias of aliasesToRemoveFromAutocomplete)
      {
        if (tsConfig.compilerOptions?.paths[alias])
        {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete tsConfig.compilerOptions.paths[alias];
        }
      }
    }
  }
});