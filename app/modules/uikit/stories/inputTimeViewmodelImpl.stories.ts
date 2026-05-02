import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type InputTimeStoryArgs = {
    value: number | undefined;
    id: string;
    name: string;
    autofocus: boolean;
    isDisabled: boolean;
};

const meta: Meta<InputTimeStoryArgs> = {
    title: 'UIKit/InputTime',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const input = uikitFactory.createInputTime();

                watchEffect(() =>
                {
                    input.value = args.value;
                    input.id = args.id;
                    input.name = args.name;
                    input.hasAutofocus = args.autofocus;
                    input.isDisabled = args.isDisabled;
                });

                return { input };
            },

            template: `<component :is="input.component" />`,
        };
    },

    argTypes: {
        value: {
            control: 'number',
        },
        id: {
            control: 'text',
        },
        name: {
            control: 'text',
        },
        autofocus: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<InputTimeStoryArgs>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: 61200000, // 17:00
        id: 'input-time-3',
        name: 'inputTime',
        autofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-time-2',
        name: 'inputTime',
        autofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: 46800000, // 13:00
        id: 'input-time-4',
        name: 'inputTime',
        autofocus: false,
        isDisabled: true,
    },
};