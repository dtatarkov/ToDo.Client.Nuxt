import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VButtonIcon from '../components/VButtonIcon.vue';
import { Icons } from '@/modules/shared/constants/icons';
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
                Icons.pencilSquare,
                Icons.trash,
                Icons.plus,
                Icons.check,
                Icons.xMark,
                Icons.heart,
                Icons.star,
                Icons.cog,
                Icons.bell,
                Icons.home,
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
        icon: Icons.pencilSquare,
        isDisabled: false,
    },
};

export const Disabled: Story = {
    args: {
        icon: Icons.pencilSquare,
        isDisabled: true,
    },
};