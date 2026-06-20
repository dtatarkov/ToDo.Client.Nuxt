import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VButtonIcon from '../components/VButtonIcon.vue';
import { Icon } from '@/modules/shared/enums/icons.js';
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
                Icon.pencilSquare,
                Icon.trash,
                Icon.plus,
                Icon.check,
                Icon.xMark,
                Icon.heart,
                Icon.star,
                Icon.cog,
                Icon.bell,
                Icon.home,
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
        icon: Icon.pencilSquare,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        icon: Icon.pencilSquare,
        isDisabled: true,
    },
};