import type { Meta, StoryObj } from '@nuxtjs/storybook';
import VToDoEditForm from '../components/VToDoEditForm.vue';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';

const meta: Meta<typeof VToDoEditForm> = {
  title: 'ToDo/ToDoEditForm',
  component: VToDoEditForm,

  render: (args) =>
  {
    return {
      components: { VToDoEditForm },

      setup()
      {
        useSharedServices();

        return { args };
      },

      template: `<VToDoEditForm v-bind="args" />`,
    };
  },
};

export default meta;

type Story = StoryObj<typeof VToDoEditForm>;

export const Default: Story = {};

export const PlannedToDo: Story = {
  args: {
    title: 'Sample Todo',
    description: 'This is a sample todo description',
    completionDatePlanned: new Date()
  }
};

export const WithoutCompletionDate: Story = {
  args: {
    title: 'Sample Todo',
    description: 'This is a sample todo description',
  }
};

export const WithLongTitle: Story = {
  args: {
    title: 'This is a very long title that should test how the form handles lengthy text inputs',
    description: 'This is a sample todo with a long title',
    completionDatePlanned: new Date()
  }
};

export const WithLongDescription: Story = {
  args: {
    title: 'Long description test',
    description: 'This is a very long description that should test how the form handles lengthy text inputs. It includes multiple sentences to simulate realistic content. The form should properly handle scrolling and resizing when dealing with large amounts of text. This helps ensure the user experience remains good even with substantial content.',
    completionDatePlanned: new Date()
  }
};