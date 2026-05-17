import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VInputTextarea from '../components/VInputTextarea.vue';

const meta: Meta<typeof VInputTextarea> = {
    title: 'UIKit/InputTextarea',
    component: VInputTextarea,

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