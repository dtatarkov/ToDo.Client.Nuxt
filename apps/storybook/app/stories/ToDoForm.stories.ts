import { VForm } from '@client/ui-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { todoFormConfiguration } from '@client/ui-todo';

const meta: Meta<typeof VForm> = {
    title: 'ToDo/ToDoForm',

    component: VForm,
};

export default meta;
type Story = StoryObj<typeof VForm>;

export const Empty: Story = {
    args: todoFormConfiguration.toData(),
};

export const Filled: Story = {
    args: todoFormConfiguration.toData({
        values: {
            title: 'Test ToDo',
            description: "This is a test description",
            completionDatePlanned: new Date('07/20/2026'),
        }
    })
};

export const WithErrors: Story = {
    args: todoFormConfiguration.toData({
        errors: {
            title: 'todo.field.title.errors.empty'
        }
    })
};
