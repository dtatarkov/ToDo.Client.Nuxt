import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type InputDateStoryArgs = {
    value: Date | undefined;
    id: string;
    name: string;
    hasAutofocus: boolean;
    isDisabled: boolean;
};

const meta: Meta<InputDateStoryArgs> = {
    title: 'UIKit/InputDate',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const input = uikitFactory.createInputDate();

                watchEffect(() =>
                {
                    input.value = args.value;
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
            control: 'date',
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
type Story = StoryObj<InputDateStoryArgs>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-02-20'),
        id: 'input-date-3',
        name: 'inputDate',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-date-2',
        name: 'inputDate',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-03-10'),
        id: 'input-date-4',
        name: 'inputDate',
        hasAutofocus: false,
        isDisabled: true,
    },
};