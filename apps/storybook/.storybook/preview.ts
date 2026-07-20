import { type Preview, setup } from '@storybook/vue3-vite';
import ui from '@nuxt/ui/vue-plugin';
import { useStorybookServices } from '../app/composables/useStorybookServices';
import './i18n-plugin';
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

  decorators: [
    () =>
    {
      useStorybookServices();

      return {
        template: `<story/>`
      };
    }
  ],

  tags: ['autodocs'],
};

export default preview;