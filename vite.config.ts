import * as path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'app/modules/shared'),
      '@forms': path.resolve(__dirname, 'app/modules/forms'),
      '@overlay': path.resolve(__dirname, 'app/modules/overlay'),
      '@todo': path.resolve(__dirname, 'app/modules/todo'),
      '@uikit': path.resolve(__dirname, 'app/modules/uikit'),
      '#styles': path.resolve(__dirname, 'styles'),
      '#components': path.resolve(__dirname, 'app/components'),
      '#composables': path.resolve(__dirname, 'app/composables'),
      '#storybook': path.resolve(__dirname, '.storybook'),
      '@': path.resolve(__dirname, 'app'),
      '@@': path.resolve(__dirname, ''),
    },
  },
});
