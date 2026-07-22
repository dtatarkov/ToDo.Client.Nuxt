import { VForm, type FormProps } from '@client/ui-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { todoFormConfiguration } from '@client/ui-core';

const meta: Meta<typeof VForm> = {
    title: 'ToDo/ToDoForm',

    // @ts-expect-error generic component typing issue in storybook
    component: VForm,
};

export default meta;
type Story = StoryObj<FormProps<keyof typeof todoFormConfiguration.elementsData>>;

export const Empty: Story = {
    args: {
        elementsData: todoFormConfiguration.elementsData,
    } satisfies FormProps<keyof typeof todoFormConfiguration.elementsData>,
};

export const Filled: Story = {
    args: {
        elementsData: todoFormConfiguration.elementsData,

        data: {
            title: 'Test ToDo',
            description: "This is a test description",
            completionDatePlanned: new Date('07/20/2026'),
        }
    }
};

export const WithErrors: Story = {
    args: {
        elementsData: todoFormConfiguration.elementsData,

        errors: {
            title: 'todo.field.title.errors.empty'
        }
    }
};
