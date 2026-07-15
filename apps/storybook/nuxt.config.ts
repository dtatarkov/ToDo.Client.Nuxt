import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxt/eslint',
  ],

  css: ['@client/ui-nuxt/css'],

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  ui: {
    colorMode: false,

    // @ts-expect-error some typing issue
    components: {
      include: [
        'UApp',
        'UModal',
        'UToast',
        'UForm',
        'UFormField',
        'UCard',
        'UButton',
        'UInput',
        'UTextarea',
        'UInputDate',
        'UInputTime',
        'UHeader',
        'UMain',
        'UFooter',
        'USidebar',
        'UNavigationMenu',
        'UCollapsible',
        'UBadge',
      ]
    },

    safelistColors: false
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      locale: 'ru',
      appTitle: 'Storybook',
      longTaskSpinnerDelay: 500,
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