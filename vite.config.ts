import * as path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      '#shared': path.resolve(__dirname, 'shared'),
      '#styles': path.resolve(__dirname, 'styles'),
      '#components': path.resolve(__dirname, 'app/components'),
      '#composables': path.resolve(__dirname, 'app/composables'),
      '#storybook': path.resolve(__dirname, '.storybook'),
      '@': path.resolve(__dirname, 'app'),
      '@@': path.resolve(__dirname, ''),
    },
  },
})
