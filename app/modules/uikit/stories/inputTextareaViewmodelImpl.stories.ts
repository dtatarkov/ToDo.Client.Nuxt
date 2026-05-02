import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type InputTextareaStoryArgs = {
    value: string;
    placeholder: string;
    id: string;
    name: string;
    hasAutofocus: boolean;
    isDisabled: boolean;
};

const meta: Meta<InputTextareaStoryArgs> = {
    title: 'UIKit/InputTextarea',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const input = uikitFactory.createTextarea();

                watchEffect(() =>
                {
                    input.value = args.value;
                    input.placeholder = args.placeholder;
                    input.id = args.id;
                    input.name = args.name;
                    input.hasAutofocus = args.hasAutofocus;
                    input.isDisabled = args.isDisabled;
                });

                return { input };
            },

            template: `<component :is="input.component" />`,
        };
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
type Story = StoryObj<InputTextareaStoryArgs>;

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