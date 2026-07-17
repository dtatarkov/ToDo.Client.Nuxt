# Plan: Migrate Storybook from Nuxt to Vue 3

## Changes Required

### 1. Update Storybook Configuration (.storybook/main.ts)
- Change framework from `@storybook-vue/nuxt` to `storybook-framework-vue3`
- Update imports accordingly

### 2. Update package.json
- Remove Nuxt-specific dependencies:
  - `@nuxtjs/storybook`
  - `@nuxt/eslint`
  - `@nuxt/ui`
  - `@nuxtjs/i18n`
  - `nuxt`
  - `@nuxt/test-utils`
- Add Vue 3 Storybook dependencies:
  - `storybook-framework-vue3`
  - `@storybook/vue3`

### 3. Update app/app.vue
- Change from `<NuxtPage />` to standard Vue 3 setup
- Remove Nuxt-specific composables

### 4. Update package.json scripts
- Change `typecheck` from `nuxt typecheck` to `vue-tsc`
- Remove `postinstall` script or change from `nuxt prepare`

### 5. Update nx.json
- Remove Nuxt plugin for storybook app

### 6. Update preview.ts
- Update imports to use standard Vue 3 imports

### 7. Update tsconfig.json
- Remove Nuxt-specific compiler options
