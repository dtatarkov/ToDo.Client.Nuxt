import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';
import type { ButtonViewmodelColor } from '../types/buttonViewmodelColor';
import { action } from 'storybook/actions';

type ButtonGeneralViewmodelStoryArgs = {
    title: string;
    color: ButtonViewmodelColor;
    isDisabled: boolean;
    isLoading: boolean;
};

const meta: Meta<ButtonGeneralViewmodelStoryArgs> = {
    title: 'UIKit/ButtonGeneral',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const button = uikitFactory.createButtonGeneral();

                button.setClickHandler(action('click'));

                watchEffect(() =>
                {
                    button.title = args.title;
                    button.color = args.color;
                    button.isDisabled = args.isDisabled;
                    button.isLoading = args.isLoading;
                });

                return { button };
            },

            template: `<component :is="button.component" />`,
        };
    },

    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as ButtonViewmodelColor[],
        },

        isDisabled: {
            control: 'boolean',
        },

        isLoading: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<ButtonGeneralViewmodelStoryArgs>;

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