import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@client/shared',
    include: ['src/**/*.{test,spec}.ts', 'test/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'dist', '.git', '.idea', '.vscode'],
    environment: 'node',
    globals: true,
  },
});
