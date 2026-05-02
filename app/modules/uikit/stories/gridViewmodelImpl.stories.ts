import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { useAppServices } from '@/composables/useAppServices';
import { UIKitViewmodelsFactory } from '../interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';
import type { ToDoCardViewmodelData } from '@/modules/todo/interfaces/todoCardViewmodel';
import { ToDoViewmodelsFactory } from '@/modules/todo/interfaces/todoViewmodelsFactory';

type GridViewmodelStoryArgs = {
    cards: ToDoCardViewmodelData[];
};

const meta: Meta<GridViewmodelStoryArgs> = {
    title: 'UIKit/Grid',

    render: (args) =>
    {
        return {
            setup()
            {
                useAppServices();

                const uikitFactory = useService(UIKitViewmodelsFactory);
                const todoFactory = useService(ToDoViewmodelsFactory);
                const grid = uikitFactory.createGrid();

                watchEffect(() =>
                {
                    const cards = args.cards.map(data =>
                    {
                        const card = todoFactory.createToDoCard();
                        card.setSource(data);
                        return card;
                    });
                    grid.setSource(cards);
                });

                return { grid };
            },

            template: `<component :is="grid.component" />`,
        };
    }
};

export default meta;
type Story = StoryObj<GridViewmodelStoryArgs>;

export const Default: Story = {
    args: {
        cards: [
            {
                title: 'Complete project documentation',
                description: 'Write comprehensive documentation for the new API endpoints',
                completionDatePlanned: new Date('2026-05-10'),
            },
            {
                title: 'Review pull requests',
                description: 'Check and merge pending PRs from the team',
                completionDateActual: new Date('2026-05-01'),
            },
            {
                title: 'Plan sprint',
                description: 'Prepare tasks and estimates for the next sprint',
                completionDatePlanned: new Date('2026-05-15'),
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
                completionDatePlanned: new Date('2026-06-01'),
            },
        ]
    }
};

export const ManyCards: Story = {
    args: {
        cards: [
            { title: 'Task 1', description: 'Description 1', completionDatePlanned: new Date('2026-05-02') },
            { title: 'Task 2', description: 'Description 2', completionDateActual: new Date('2026-05-01') },
            { title: 'Task 3', description: 'Description 3', completionDatePlanned: new Date('2026-05-03') },
            { title: 'Task 4', description: 'Description 4', completionDatePlanned: new Date('2026-05-04') },
            { title: 'Task 5', description: 'Description 5', completionDateActual: new Date('2026-05-01') },
            { title: 'Task 6', description: 'Description 6', completionDatePlanned: new Date('2026-05-05') },
            { title: 'Task 7', description: 'Description 7' },
            { title: 'Task 8', description: 'Description 8', completionDatePlanned: new Date('2026-05-06') },
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
                completionDatePlanned: new Date('2026-12-31'),
            },
            {
                title: 'Short',
                description: 'Short description',
                completionDateActual: new Date('2026-05-01'),
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
                completionDatePlanned: new Date('2026-05-20'),
            },
            {
                title: 'Completed task',
                description: 'This task has been completed',
                completionDateActual: new Date('2026-05-01'),
            },
            {
                title: 'Overdue task',
                description: 'This task was planned for a past date',
                completionDatePlanned: new Date('2026-04-15'),
            },
            {
                title: 'Task without dates',
                description: 'This task has no dates set',
            },
        ]
    }
};