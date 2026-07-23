import { VInputTime } from '@client/ui-vue';
import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { booleanArgType } from '../argTypes/booleanArgType';


const meta: Meta<typeof VInputTime> = {
    title: 'UIKit/InputTime',
    component: VInputTime,

    argTypes: {
        value: {
            control: 'number',
        },
        id: inputIdArgType,
        name: inputNameArgType,
        hasAutofocus: inputHasAutofocusArgType,
        isDisabled: inputIsDisabledArgType,
        hasError: booleanArgType,
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: 61200000, // 17:00
        id: 'input-time-1',
        name: 'input-time-1',
        hasAutofocus: true,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-time-2',
        name: 'input-time-2',
    },
};

export const Disabled: Story = {
    args: {
        value: 46800000, // 13:00
        id: 'input-time-3',
        name: 'input-time-3',
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: 0,
        id: 'input-time-4',
        name: 'input-time-4',
        hasError: true,
    },
};