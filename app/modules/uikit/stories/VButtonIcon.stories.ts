import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VButtonIcon from '../components/VButtonIcon.vue';
import { fn } from 'storybook/test';
import { useSharedServices } from '@/modules/shared/composables/useSharedServices';

const meta: Meta<typeof VButtonIcon> = {
    title: 'UIKit/ButtonIcon',
    component: VButtonIcon,


    args: {
        onClick: fn(),
    },

    argTypes: {
        icon: {
            control: 'select',
            options: [
                'i-heroicons-pencil-square',
                'i-heroicons-trash',
                'i-heroicons-plus',
                'i-heroicons-check',
                'i-heroicons-x-mark',
                'i-heroicons-heart',
                'i-heroicons-star',
                'i-heroicons-cog',
                'i-heroicons-bell',
                'i-heroicons-home',
            ],
        },

        isDisabled: {
            control: 'boolean',
        },
    },

    render: (args) =>
    {
        return {
            components: { VButtonIcon },

            setup()
            {
                useSharedServices();

                return { args };
            },

            template: `<VButtonIcon v-bind="args" />`,
        };
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: 'i-heroicons-pencil-square',
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        icon: 'i-heroicons-pencil-square',
        isDisabled: true,
    },
};