import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VInputDateTime from '../components/VInputDateTime.vue';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';

const meta: Meta<typeof VInputDateTime> = {
    title: 'UIKit/InputDateTime',
    component: VInputDateTime,

    render: (args) =>
    {
        return {
            components: { VInputDateTime },

            setup()
            {
                useSharedServices();

                return { args };
            },

            template: `<VInputDateTime v-bind="args" />`,
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Autofocus: Story = {
    args: {
        value: new Date('2026-06-15T09:45:00'),
        id: 'input-datetime-3',
        name: 'inputDateTime',
        hasAutofocus: true,
        isDisabled: false,
    },
};

export const Empty: Story = {
    args: {
        value: undefined,
        id: 'input-datetime-2',
        name: 'inputDateTime',
        hasAutofocus: false,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        value: new Date('2026-07-20T18:20:00'),
        id: 'input-datetime-4',
        name: 'inputDateTime',
        hasAutofocus: false,
        isDisabled: true,
    },
};