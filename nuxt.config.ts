import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
  ],

  css: ['~/assets/css/main.css'],

  alias: {
    '@shared': '../app/modules/shared',
    '@forms': '../app/modules/forms',
    '@overlay': '../app/modules/overlay',
    '@todo': '../app/modules/todo',
    '@uikit': '../app/modules/uikit',
  },

  components: [
    {
      path: '~/components',
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
    // @ts-ignore
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
      locale: 'ru'
    },
  },

  experimental: {
    decorators: true,
  },
});