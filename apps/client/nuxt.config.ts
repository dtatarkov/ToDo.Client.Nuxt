import { defineNuxtConfig } from "nuxt/config";
import * as path from 'node:path';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/i18n'
  ],

  css: ['@/assets/css/main.css'],

  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],

  alias: {
    '@packages/ssr': path.resolve(__dirname, '../../packages/ssr/index.ts'),
    '@packages/di': path.resolve(__dirname, '../../packages/di/index.ts'),
    '@packages/storybook': path.resolve(__dirname, '../../packages/storybook/index.ts'),
    '@packages/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
    '@packages/datetime': path.resolve(__dirname, '../../packages/datetime/src/index.ts'),
  },

  typescript: {
    tsConfig: {
      include: [
        "../../.storybook/**/*",
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
    // Disable safelist colors to reduce CSS size
    safelistColors: false
  },

  i18n: {
    locales: [
      { code: 'ru', iso: 'ru-RU', file: 'ru.json' },
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
