import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import VButtonGeneral from '../components/VButtonGeneral.vue';
import { fn } from 'storybook/test';
import { useStorybookSharedServices } from '@/modules/shared/composables/useStorybookSharedServices.js';
import { storybookColorSelect } from '@packages/storybook';

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
    },

    render: (args) =>
    {
        return {
            components: { VButtonGeneral },

            setup()
            {
                useStorybookSharedServices();

                return { args };
            },

            template: `<VButtonGeneral v-bind="args" />`,
        };
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Создать Задание',
        color: 'primary',
        isDisabled: false,
        isLoading: false,
    },
};

export const Secondary: Story = {
    args: {
        title: 'Обновить',
        color: 'secondary',
        isDisabled: false,
        isLoading: false,
    },
};

export const Success: Story = {
    args: {
        title: 'Подтвердить',
        color: 'success',
        isDisabled: false,
        isLoading: false,
    },
};

export const Warning: Story = {
    args: {
        title: 'Блокировать',
        color: 'warning',
        isDisabled: false,
        isLoading: false,
    },
};

export const Error: Story = {
    args: {
        title: 'Удалить',
        color: 'error',
        isDisabled: false,
        isLoading: false,
    },
};

export const Disabled: Story = {
    args: {
        title: 'Сохранить',
        color: 'primary',
        isDisabled: true,
        isLoading: false,
    },
};

export const Loading: Story = {
    args: {
        title: 'Сохранить',
        color: 'primary',
        isDisabled: false,
        isLoading: true,
    },
};