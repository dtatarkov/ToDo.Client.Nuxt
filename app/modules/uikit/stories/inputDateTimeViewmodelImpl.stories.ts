import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type InputDateTimeStoryArgs = {
    value: Date | undefined;
    id: string;
    name: string;
    autofocus: boolean;
    isDisabled: boolean;
};

const meta: Meta<InputDateTimeStoryArgs> = {
    title: 'UIKit/InputDateTime',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const input = uikitFactory.createInputDateTime();

                watchEffect(() =>
                {
                    input.value = args.value;
                    input.id = args.id;
                    input.name = args.name;
                    input.autofocus = args.autofocus;
                    input.isDisabled = args.isDisabled;
                });

                return { input };
            },

            template: `<component :is="input.component" />`,
        };
    },

    argTypes: {
        value: {
            control: 'date',
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
type Story = StoryObj<InputDateTimeStoryArgs>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-06-15T09:45:00'),
        id: 'input-datetime-3',
        name: 'inputDateTime',
        autofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-datetime-2',
        name: 'inputDateTime',
        autofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-07-20T18:20:00'),
        id: 'input-datetime-4',
        name: 'inputDateTime',
        autofocus: false,
        isDisabled: true,
    },
};