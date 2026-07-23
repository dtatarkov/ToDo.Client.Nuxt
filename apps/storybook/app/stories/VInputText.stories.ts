import { VInputText } from '@client/ui-vue';
import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { booleanArgType } from '../argTypes/booleanArgType';

const meta: Meta<typeof VInputText> = {
    title: 'UIKit/InputText',
    component: VInputText,

    args: {
        'onUpdate:value': fn(),
    },

    argTypes: {
        value: {
            control: 'text',
        },
        ////placeholder: inputPlaceholderArgType,
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
        value: '',
        //placeholder: 'Autofocused input',
        id: 'input-text-1',
        name: 'input-text-1',
        hasAutofocus: true,
    },
};

export const Empty: Story = {
    args: {
        value: '',
        //placeholder: 'Type something',
        id: 'input-text-2',
        name: 'input-text-2',
    },
};

export const Disabled: Story = {
    args: {
        value: 'Disabled text',
        //placeholder: 'Cannot edit',
        id: 'input-text-3',
        name: 'input-text-3',
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: 'Invalid input',
        //placeholder: 'Error state',
        id: 'input-text-4',
        name: 'input-text-4',
        hasAutofocus: false,
        isDisabled: false,
        hasError: true,
    },
};
