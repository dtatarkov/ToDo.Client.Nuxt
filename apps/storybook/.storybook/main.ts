import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    "../app/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],

  framework: "@storybook/vue3-vite",
};

export default config;