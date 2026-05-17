import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { fn } from 'storybook/test';
import VInputText from '../components/VInputText.vue';

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
        placeholder: {
            control: 'text',
        },
        id: {
            control: 'text',
        },
        name: {
            control: 'text',
        },
        hasAutofocus: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: '',
        placeholder: 'Autofocused input',
        id: 'input-text-5',
        name: 'inputText',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: '',
        placeholder: 'Type something',
        id: 'input-text-2',
        name: 'inputText',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: 'Disabled text',
        placeholder: 'Cannot edit',
        id: 'input-text-4',
        name: 'inputText',
        hasAutofocus: false,
        isDisabled: true,
    },
};