import type { Color } from '@client/ui-core';
import type { ButtonGeneralData } from '@client/ui-uikit';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { createToDoAddFormConfiguration, createToDoUpdateFormConfiguration } from '@client/ui-todo';
import { FormViewmodel } from '@client/ui-forms';
import { VModal } from '@client/ui-vue';
import { fn } from 'storybook/test';

const meta: Meta = {
    title: 'ToDo/ToDoModal',
    component: VModal,

    args: {
        onClose: fn(),
        onCancel: fn(),
        onConfirm: fn(),
    }
};

export default meta;
type Story = StoryObj<typeof VModal>;

const buttonCancel: Partial<ButtonGeneralData> = {
    titleKey: 'button.cancel',
};

const buttonConfirmCreate: Partial<ButtonGeneralData> = {
    titleKey: 'button.create',
    color: 'primary' as Color,
};

const buttonConfirmSave: Partial<ButtonGeneralData> = {
    titleKey: 'button.save',
    color: 'primary' as Color,
};

export const AddEmpty: Story = {
    args: {
        title: 'Create ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoAddFormConfiguration().toData(),
        },
        buttonConfirm: buttonConfirmCreate,
        buttonCancel,
    },
};

export const AddFilled: Story = {
    args: {
        title: 'Create ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoAddFormConfiguration().toData({
                values: {
                    title: 'Test ToDo',
                    description: 'This is a test description',
                    completionDatePlanned: new Date('07/20/2026'),
                },
            }),
        },
        buttonConfirm: buttonConfirmCreate,
        buttonCancel,
    },
};

export const AddWithErrors: Story = {
    args: {
        title: 'Create ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoAddFormConfiguration().toData({
                errors: {
                    title: 'todo.field.title.errors.empty',
                },
            }),
        },
        buttonConfirm: buttonConfirmCreate,
        buttonCancel,
    },
};

export const AddDisabled: Story = {
    args: {
        title: 'Create ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoAddFormConfiguration().toData(),
        },
        buttonConfirm: buttonConfirmCreate,
        buttonCancel,
        isDisabled: true,
    },
};

export const EditFilled: Story = {
    args: {
        title: 'Edit ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoUpdateFormConfiguration().toData({
                values: {
                    id: 'todo-1',
                    title: 'Test ToDo',
                    description: 'This is a test description',
                    completionDatePlanned: new Date('07/20/2026'),
                },
            }),
        },
        buttonConfirm: buttonConfirmSave,
        buttonCancel,
    },
};

export const EditWithErrors: Story = {
    args: {
        title: 'Edit ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoUpdateFormConfiguration().toData({
                errors: {
                    title: 'todo.field.title.errors.empty',
                },
            }),
        },
        buttonConfirm: buttonConfirmSave,
        buttonCancel,
    },
};

export const EditDisabled: Story = {
    args: {
        title: 'Edit ToDo',
        content: {
            renderKey: FormViewmodel.renderKey,
            data: createToDoUpdateFormConfiguration().toData({
                values: {
                    id: 'todo-1',
                    title: 'Test ToDo',
                    description: 'This is a test description',
                    completionDatePlanned: new Date('07/20/2026'),
                },
            }),
        },
        buttonConfirm: buttonConfirmSave,
        buttonCancel,
        isDisabled: true,
    },
};