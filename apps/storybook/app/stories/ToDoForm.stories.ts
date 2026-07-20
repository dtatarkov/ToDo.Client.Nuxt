import { VForm } from '@client/ui-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { todoFormConfig } from '@client/ui-core';

const meta: Meta<typeof VForm> = {
    title: 'ToDo/ToDoForm',
    component: VForm,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
    args: {
        elements: todoFormConfig.elements,
    },
};
