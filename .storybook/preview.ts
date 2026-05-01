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
  decorators: [() => ({
    template: `<div class="dark">
        <div style="background-color: var(--ui-bg); color: var(--ui-text);">
          <story/>
        </div>
      </div>`
  })]
};

export default preview;