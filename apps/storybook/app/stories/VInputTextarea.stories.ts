import { VInputTextarea } from '@client/ui-vue';
import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { booleanArgType } from '../argTypes/booleanArgType';

const meta: Meta<typeof VInputTextarea> = {
    title: 'UIKit/InputTextarea',
    component: VInputTextarea,

    argTypes: {
        value: {
            control: 'text',
        },
        //placeholder: inputPlaceholderArgType,
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
        //placeholder: 'Autofocused textarea',
        id: 'input-textarea-1',
        name: 'input-textarea-1',
        hasAutofocus: true,
    },
};

export const Empty: Story = {
    args: {
        value: '',
        //placeholder: 'Type something',
        id: 'input-textarea-2',
        name: 'input-textarea-2',
    },
};

export const Disabled: Story = {
    args: {
        value: 'Disabled content',
        //placeholder: 'Cannot edit',
        id: 'input-textarea-3',
        name: 'input-textarea-3',
    },
};

export const Error: Story = {
    args: {
        value: 'Invalid content',
        //placeholder: 'Error state',
        id: 'input-textarea-4',
        name: 'input-textarea-4',
        hasError: true,
    },
};