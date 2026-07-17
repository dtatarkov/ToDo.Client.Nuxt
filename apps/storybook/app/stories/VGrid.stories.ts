import type { Meta, StoryObj, } from '@storybook/vue3-vite';
import { VGrid, VCard, type CardData } from '@client/ui-vue';

type VGridStoryArgs = {
    cards: CardData[];
};

const meta: Meta<VGridStoryArgs> = {
    title: 'UIKit/Grid',
    component: VGrid,

    render: (args) =>
    {
        return {
            components: { VGrid, VCard },
            setup()
            {
                return args;
            },

            template: `<VGrid>
                <VCard v-for="card of cards" v-bind="card" />
            </VGrid>`,
        };
    }
};

export default meta;
type Story = StoryObj<VGridStoryArgs>;

export const Default: Story = {
    args: {
        cards: [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for the new API endpoints',
            },
            {
                title: 'Review pull requests',
                description: 'Check and merge pending PRs from the team',
            },
            {
                title: 'Plan sprint',
                description: 'Prepare tasks and estimates for the next sprint',
            },
        ]
    }
};

export const SingleCard: Story = {
    args: {
        cards: [
            {
                title: 'Single task',
                description: 'This is a single todo card in a grid',
            },
        ]
    }
};

export const ManyCards: Story = {
    args: {
        cards: [
            { title: 'Task 1', description: 'Description 1' },
            { title: 'Task 2', description: 'Description 2' },
            { title: 'Task 3', description: 'Description 3' },
            { title: 'Task 4', description: 'Description 4' },
            { title: 'Task 5', description: 'Description 5' },
            { title: 'Task 6', description: 'Description 6' },
            { title: 'Task 7', description: 'Description 7' },
            { title: 'Task 8', description: 'Description 8' },
        ]
    }
};

export const EmptyGrid: Story = {
    args: {
        cards: []
    }
};

export const CardsWithLongContent: Story = {
    args: {
        cards: [
            {
                title: 'Card with very long title that might wrap or truncate depending on styling',
                description: 'This is a very long description that could potentially span multiple lines and test the grid layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
                title: 'Short',
                description: 'Short description',
            },
        ]
    }
};

export const MixedCardStates: Story = {
    args: {
        cards: [
            {
                title: 'Planned task',
                description: 'This task has a planned completion date',
            },
            {
                title: 'Completed task',
                description: 'This task has been completed',
            },
            {
                title: 'Overdue task',
                description: 'This task was planned for a past date',
            },
            {
                title: 'Task without dates',
                description: 'This task has no dates set',
            },
        ]
    }
};