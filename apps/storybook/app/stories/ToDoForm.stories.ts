import { VForm, type FormProps } from '@client/ui-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { todoFormConfig } from '@client/ui-core';

const meta: Meta<typeof VForm> = {
    title: 'ToDo/ToDoForm',

    // @ts-expect-error generic component typing issue in storybook
    component: VForm,
};

export default meta;
type Story = StoryObj<FormProps<keyof typeof todoFormConfig.elements>>;

export const Empty: Story = {
    args: {
        elements: todoFormConfig.elements,
    } satisfies FormProps<keyof typeof todoFormConfig.elements>,
};

export const Filled: Story = {
    args: {
        elements: todoFormConfig.elements,
        data: {
            title: 'Test ToDo',
            description: "This is a test description",
            completionDatePlanned: new Date('07/20/2026'),
        }
    }
};
