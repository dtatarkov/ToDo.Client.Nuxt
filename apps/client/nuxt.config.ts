import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/i18n'
  ],

  css: ['@client/ui-vue/css'],

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  ui: {
    // @ts-expect-error some typing issue. object configuration with preference key is absolutely valid
    colorMode: {
      preference: 'dark'
    },
  },

  i18n: {
    locales: [
      { code: 'ru', iso: 'ru-RU', file: 'ru.ts' },
    ],
    defaultLocale: 'ru',
    langDir: 'locales',
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      locale: 'ru',
      appTitle: 'ToDo',
      longTaskSpinnerDelay: 500, // ms
      validatorsCacheSizeMax: 50
    },
  },

  experimental: {
    decorators: true,
  },

  hooks: {
    'prepare:types': ({ tsConfig }) =>
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
