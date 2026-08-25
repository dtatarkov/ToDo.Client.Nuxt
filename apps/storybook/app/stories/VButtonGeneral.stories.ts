import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { VButtonGeneral } from '@client/ui-vue';
import { fn } from 'storybook/test';
import { storybookColorSelect } from '../argTypes/storybookColorSelect';


const meta: Meta<typeof VButtonGeneral> = {
    title: 'UIKit/ButtonGeneral',
    component: VButtonGeneral,

    args: {
        onClick: fn(),
    },

    argTypes: {
        color: storybookColorSelect,

        isDisabled: {
            control: 'boolean',
        },

        isLoading: {
            control: 'boolean',
        },
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        titleKey: 'button.save',
        color: 'primary',
        isDisabled: false,
        isLoading: false,
    },
};

export const Secondary: Story = {
    args: {
        titleKey: 'button.save',
        color: 'secondary',
        isDisabled: false,
        isLoading: false,
    },
};

export const Success: Story = {
    args: {
        titleKey: 'button.save',
        color: 'success',
        isDisabled: false,
        isLoading: false,
    },
};

export const Warning: Story = {
    args: {
        titleKey: 'button.cancel',
        color: 'warning',
        isDisabled: false,
        isLoading: false,
    },
};

export const Error: Story = {
    args: {
        titleKey: 'button.cancel',
        color: 'error',
        isDisabled: false,
        isLoading: false,
    },
};

export const Disabled: Story = {
    args: {
        titleKey: 'button.save',
        color: 'primary',
        isDisabled: true,
        isLoading: false,
    },
};

export const Loading: Story = {
    args: {
        titleKey: 'button.save',
        color: 'primary',
        isDisabled: false,
        isLoading: true,
    },
};