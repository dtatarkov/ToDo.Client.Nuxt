import type { Meta, StoryObj } from '@nuxtjs/storybook';
import VButtonGeneral from '../components/VButtonGeneral.vue';

const meta: Meta<typeof VButtonGeneral> = {
  title: 'UIKit/VButtonGeneral',
  component: VButtonGeneral,

  render: (args) =>
  {
    return {
      components: { VButtonGeneral },

      setup()
      {
        useAppServices();

        return { args };
      },

      template: `<VButtonGeneral v-bind="args" />`,
    };
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    color: 'secondary',
  },
};

export const Neutral: Story = {
  args: {
    title: 'Neutral Button',
    color: 'neutral',
  },
};

export const Success: Story = {
  args: {
    title: 'Success Button',
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning Button',
    color: 'warning',
  },
};

export const Error: Story = {
  args: {
    title: 'Error Button',
    color: 'error',
    isDisabled: false,
    isLoading: false,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Button',
    isLoading: true,
  },
};

export const EmptyTitle: Story = {
  args: {
    title: '',
  },
};