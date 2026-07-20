import { VInputText } from '@client/ui-vue';
import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import { inputHasAutofocusArgType } from '../argTypes/inputHasAutofocusArgType';
import { inputHighlightArgType } from '../argTypes/inputHighlightArgType';
import { inputIdArgType } from '../argTypes/inputIdArgType';
import { inputIsDisabledArgType } from '../argTypes/inputIsDisabledArgType';
import { inputNameArgType } from '../argTypes/inputNameArgType';
import { storybookColorSelect } from '../argTypes/storybookColorSelect';

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
        color: storybookColorSelect,
        shouldHighlight: inputHighlightArgType,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: '',
        //placeholder: 'Autofocused input',
        id: 'input-text-5',
        name: 'inputText',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: '',
        //placeholder: 'Type something',
        id: 'input-text-2',
        name: 'inputText',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: 'Disabled text',
        //placeholder: 'Cannot edit',
        id: 'input-text-4',
        name: 'inputText',
        hasAutofocus: false,
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: 'Invalid input',
        //placeholder: 'Error state',
        id: 'input-text-6',
        name: 'inputText',
        hasAutofocus: false,
        isDisabled: false,
        color: 'error',
        shouldHighlight: true,
    },
};
