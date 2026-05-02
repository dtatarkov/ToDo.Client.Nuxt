import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type InputTextStoryArgs = {
    value: string;
    placeholder: string;
    id: string;
    name: string;
    hasAutofocus: boolean;
    isDisabled: boolean;
};

const meta: Meta<InputTextStoryArgs> = {
    title: 'UIKit/InputText',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const input = uikitFactory.createInputText();

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
type Story = StoryObj<InputTextStoryArgs>;

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