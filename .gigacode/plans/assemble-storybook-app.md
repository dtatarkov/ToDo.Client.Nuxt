# Assemble Storybook App Plan

## Overview
Extract Storybook files from `apps/client` into a new `apps/storybook` directory with proper Nuxt initialization.

## Current State
- Stories exist in `apps/client/app/modules/*/stories/`
- Storybook config exists in `apps/client/.storybook/`
- UI components are in `packages/ui/vue/src/components/`

## Tasks

### 1. Create apps/storybook directory structure
- Create `apps/storybook` directory
- Copy Storybook-related files from `apps/client`:
  - `.storybook/` directory
  - `app/modules/*/stories/` (uikit and todo stories)
  - `app/composables/` (for useStorybookServices and related composables)
  - `app/assets/` (CSS files)

### 2. Create Storybook-specific nuxt.config.ts
- Create `apps/storybook/nuxt.config.ts` with proper Nuxt configuration
- Configure modules: `@nuxt/test-utils/module`, `@nuxt/ui`, `@nuxt/eslint`, `@nuxtjs/i18n`
- Configure UI components
- Configure i18n
- Set `ssr: false` for Storybook
- Configure runtimeConfig for Storybook context

### 3. Create package.json for Storybook app
- Create `apps/storybook/package.json` with Storybook dependencies
- Reference local packages: `@client/ui-vue`, `@client/di`, `@client/datetime`, `@client/shared`, `@client/ssr`, `@client/eslint`
- Include Storybook devDependencies

### 4. Create eslint.config.mjs
- Create `apps/storybook/eslint.config.mjs` based on the client's config
- Configure ESLint for the Storybook app

### 5. Update story imports
- Update story files to import from `@client/ui-vue` instead of relative paths
- Ensure all story imports work correctly

### 6. Configure Storybook composables
- Update `useStorybookServices` to work with proper Nuxt context
- Ensure all composables work standalone in Storybook context

## File Structure (Target)
```
apps/
├── client/ (existing Nuxt app)
│   └── ...
└── storybook/ (new Storybook app)
    ├── package.json
    ├── nuxt.config.ts
    ├── eslint.config.mjs
    ├── .storybook/
    │   ├── main.ts
    │   ├── preview.ts
    │   └── preview.css
    ├── app/
    │   ├── modules/
    │   │   ├── uikit/
    │   │   │   └── stories/
    │   │   └── todo/
    │   │       └── stories/
    │   ├── composables/
    │   └── assets/
```

## Notes
- Skip stub implementations - user will handle later
- Don't test Storybook functionality yet
- Keep @nuxtjs/storybook as the framework
- `apps/storybook` is a proper Nuxt app that runs Storybook with full initialization
- Nuxt will generate tsconfig.json automatically
