import type { Meta, StoryObj } from '@nuxtjs/storybook';
import VButtonIcon from '../components/VButtonIcon.vue';

const meta: Meta<typeof VButtonIcon> = {
  title: 'UIKit/VButtonIcon',
  component: VButtonIcon,

  render: (args) =>
  {
    return {
      components: { VButtonIcon },

      setup()
      {
        useAppServices();

        return { args };
      },

      template: `<VButtonIcon v-bind="args" />`,
    };
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'i-heroicons-pencil-square',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'i-heroicons-pencil-square',
    isDisabled: true,
  },
};

export const EmptyIcon: Story = {
  args: {
    icon: '',
  },
};