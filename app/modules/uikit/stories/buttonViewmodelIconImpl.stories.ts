import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';
import { action } from 'storybook/actions';

type ButtonIconViewmodelStoryArgs = {
    icon: string;
    isDisabled: boolean;
};

const meta: Meta<ButtonIconViewmodelStoryArgs> = {
    title: 'UIKit/Buttons/Icon',

    render: (args) =>
    {
        useAppServices();

        const uikitFactory = useService(UIKitViewmodelsFactory);
        const button = uikitFactory.createButtonIcon();

        button.icon = args.icon;
        button.isDisabled = args.isDisabled;

        button.setClickHandler(action('click'));

        return {
            setup()
            {
                return { button };
            },

            template: `<component :is="button.component" />`,
        };
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
};

export default meta;
type Story = StoryObj<ButtonIconViewmodelStoryArgs>;

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