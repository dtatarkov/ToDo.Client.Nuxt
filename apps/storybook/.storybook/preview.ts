import { type Preview, setup } from '@storybook/vue3-vite';
import ui from '@nuxt/ui/vue-plugin';
import '@client/ui-vue/css';
import './preview.css';

setup(app =>
{
  app.use(ui);
});

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