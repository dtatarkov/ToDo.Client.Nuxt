import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@client/shared',
    include: ['test/**/*.{test,spec}.ts'],
    environment: 'node',
    globals: true,
  },
});
