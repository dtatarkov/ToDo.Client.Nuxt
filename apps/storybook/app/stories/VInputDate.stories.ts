import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { VInputDate } from '@client/ui-vue';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { booleanArgType } from '../argTypes/booleanArgType';

const meta: Meta<typeof VInputDate> = {
    title: 'UIKit/InputDate',
    component: VInputDate,

    argTypes: {
        value: {
            control: 'date',
        },
        id: inputIdArgType,
        name: inputNameArgType,
        hasAutofocus: inputHasAutofocusArgType,
        isDisabled: inputIsDisabledArgType,
        hasError: booleanArgType
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-02-20'),
        id: 'input-date-1',
        name: 'input-date-1',
        hasAutofocus: true,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-date-2',
        name: 'input-date-2',
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-03-10'),
        id: 'input-date-3',
        name: 'input-date-3',
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: new Date('2026-04-01'),
        id: 'input-date-4',
        name: 'input-date-4',
        hasError: true,
    },
};