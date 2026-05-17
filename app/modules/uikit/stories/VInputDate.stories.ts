import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VInputDate from '../components/VInputDate.vue';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';

type InputDateStoryArgs = {
    value: Date | undefined;
    id: string;
    name: string;
    hasAutofocus: boolean;
    isDisabled: boolean;
};

const meta: Meta<typeof VInputDate> = {
    title: 'UIKit/InputDate',
    component: VInputDate,

    render: (args) =>
    {
        return {
            components: { VInputDate },

            setup()
            {
                useSharedServices();

                return { args };
            },

            template: `<VInputDate v-bind="args" />`,
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