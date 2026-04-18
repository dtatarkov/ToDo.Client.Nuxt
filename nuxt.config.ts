import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools         : { enabled: true },
  modules          : [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
  ],

  css: ['~/assets/css/main.css'],

  components: [
    {
      path      : '~/components',
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

  alias: {
    '@overlay': '../modules/overlay/runtime/app',
    '@shared' : '../modules/shared/runtime/app',
    '@todo'   : '../modules/todo/runtime/app',
  },

  ui: {
    // @ts-ignore
    colorMode: process.env.NUXT_ALLOW_COLOR_MODE === 'true' ? {
      preference: 'dark'
    } : false
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      locale    : 'ru'
    },
  },

  experimental: {
    decorators: true,
  },
})