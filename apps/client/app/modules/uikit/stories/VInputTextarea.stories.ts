import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VInputTextarea from '../components/VInputTextarea.vue';
import { storybookColorSelect } from '../storybook/storybookColorSelect';
import { inputIdArgType } from '../storybook/inputIdArgType';
import { inputNameArgType } from '../storybook/inputNameArgType';
import { inputHasAutofocusArgType } from '../storybook/inputHasAutofocusArgType';
import { inputIsDisabledArgType } from '../storybook/inputIsDisabledArgType';
import { inputPlaceholderArgType } from '../storybook/inputPlaceholderArgType';
import { inputHighlightArgType } from '../storybook/inputHighlightArgType';

const meta: Meta<typeof VInputTextarea> = {
    title: 'UIKit/InputTextarea',
    component: VInputTextarea,

    argTypes: {
        value: {
            control: 'text',
        },
        placeholder: inputPlaceholderArgType,
        id: inputIdArgType,
        name: inputNameArgType,
        hasAutofocus: inputHasAutofocusArgType,
        isDisabled: inputIsDisabledArgType,
        color: storybookColorSelect,
        highlight: inputHighlightArgType,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: '',
        placeholder: 'Autofocused textarea',
        id: 'input-textarea-3',
        name: 'inputTextarea',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: '',
        placeholder: 'Type something',
        id: 'input-textarea-2',
        name: 'inputTextarea',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: 'Disabled content',
        placeholder: 'Cannot edit',
        id: 'input-textarea-5',
        name: 'inputTextarea',
        hasAutofocus: false,
        isDisabled: true,
    },
};

export const Error: Story = {
    args: {
        value: 'Invalid content',
        placeholder: 'Error state',
        id: 'input-textarea-6',
        name: 'inputTextarea',
        hasAutofocus: false,
        isDisabled: false,
        color: 'error',
        highlight: true,
    },
};