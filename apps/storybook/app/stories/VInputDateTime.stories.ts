import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { VInputDateTime } from '@client/ui-vue';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { booleanArgType } from '../argTypes/booleanArgType';


const meta: Meta<typeof VInputDateTime> = {
    title: 'UIKit/InputDateTime',
    component: VInputDateTime,

    argTypes: {
        value: {
            control: 'date',
        },
        id: inputIdArgType,
        name: inputNameArgType,
        hasAutofocus: inputHasAutofocusArgType,
        isDisabled: inputIsDisabledArgType,
        hasError: booleanArgType,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-06-15T09:45:00'),
        id: 'input-datetime-1',
        name: 'input-datetime-1',
        hasAutofocus: true,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-datetime-2',
        name: 'input-datetime-2',
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-07-20T18:20:00'),
        id: 'input-datetime-3',
        name: 'input-datetime-3',
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: new Date('2026-05-01T12:00:00'),
        id: 'input-datetime-4',
        name: 'input-datetime-4',
        hasError: true,
    },
};