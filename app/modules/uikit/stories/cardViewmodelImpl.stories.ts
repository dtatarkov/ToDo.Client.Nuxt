import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';

type CardViewmodelStoryArgs = {
    title: string;
    description: string;
};

const meta: Meta<CardViewmodelStoryArgs> = {
    title: 'UIKit/Card',

    render: (args) =>
    {
        useAppServices();

        const uikitFactory = useService(UIKitViewmodelsFactory);
        const card = uikitFactory.createCard();

        card.title = args.title;
        card.description = args.description;

        return {
            setup()
            {
                return { card };
            },

            template: `<component :is="card.component" />`,
        };
    },
};

export default meta;
type Story = StoryObj<CardViewmodelStoryArgs>;

export const Default: Story = {
    args: {
        title: 'Sample Card',
        description: 'This is a sample card with some description text.',
    },
};

export const TitleOnly: Story = {
    args: {
        title: 'Sample Card',
    },
};

export const DescriptionOnly: Story = {
    args: {
        description: 'This is a sample card with some description text.',
    },
};

export const LongContent: Story = {
    args: {
        title: 'Card with very long title that might wrap or truncate depending on styling',
        description: 'This is a very long description that could potentially span multiple lines and test the card layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
};

export const EmptyCard: Story = {
    args: {
        title: '',
        description: '',
    },
};