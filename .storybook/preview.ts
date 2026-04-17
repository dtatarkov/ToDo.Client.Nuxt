import type { Preview } from '@nuxtjs/storybook';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  
  tags: ['autodocs'],
};

export default preview;