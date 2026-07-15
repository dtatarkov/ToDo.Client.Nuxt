import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { VButtonIcon } from '@client/ui-nuxt';
import { Icon } from '@client/shared';
import { fn } from 'storybook/test';

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
                Icon.bellInactive,
                Icon.home,
            ],
        },

        isDisabled: {
            control: 'boolean',
        },
    }
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