import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { defineVitestProject } from "@nuxt/test-utils/config";

export default mergeConfig(viteConfig, defineConfig({
  test: {
    projects: [
      {
        extends: true,
        
        test: {
          name: 'unit',
          include: ['app/test/unit/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['app/test/nuxt/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
    ],
  },
}));
