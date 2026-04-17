import type { StorybookConfig } from '@nuxtjs/storybook';

const config: StorybookConfig = {
  stories: [
    "../app/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  
  framework: "@storybook-vue/nuxt",
};
export default config;