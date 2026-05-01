import type { Meta, StoryObj, } from '@nuxtjs/storybook';
import { fn } from 'storybook/test';
import { ToDoCardViewmodelImpl } from '../viewmodels/todoCardViewmodelImpl';
import type { ToDoCardViewmodelData } from '../interfaces/todoCardViewmodel';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { useAppServices } from '@/composables/useAppServices';
import type { Action } from '@/modules/shared/types/action';
import { useEffectsContainer } from '@/modules/shared/composables/useEffectsContainer';

type ToDoCardViewmodelStoryArgs = Partial<ToDoCardViewmodelData & { click: Action; }>;

const meta: Meta<ToDoCardViewmodelStoryArgs> = {
    title: 'ToDo/ToDoCard',

    render: (args) =>
    {
        useAppServices();

        const card = new ToDoCardViewmodelImpl(({ editButton }) =>
        {
            if (args.click)
            {
                useEffectsContainer(() =>
                {
                    editButton.click.subscribe(args.click as Action);
                });
            }
        });

        updatePropertiesWithData(card, args);

        return {
            setup()
            {
                return { card };
            },

            template: `<component :is="card.component" />`,
        };
    }
};

export default meta;
type Story = StoryObj<ToDoCardViewmodelStoryArgs>;

export const Default: Story = {
    args: {
        title: 'Title',
        description: 'Description',
    }
};

export const WithPlannedDate: Story = {
    args: {
        title: 'Task with planned date',
        description: 'This task has a planned completion date.',
        completionDatePlanned: new Date('2026-12-31'),
    }
};

export const WithActualDate: Story = {
    args: {
        title: 'Completed task',
        description: 'This task has been completed.',
        completionDateActual: new Date('2026-05-01'),
    }
};

export const WithBothDates: Story = {
    args: {
        title: 'Task with both dates',
        description: 'Planned and actual completion dates are set.',
        completionDatePlanned: new Date('2026-06-15'),
        completionDateActual: new Date('2026-06-10'),
    }
};

export const LongContent: Story = {
    args: {
        title: 'This is a very long title that might overflow the card layout and need to be truncated or wrapped appropriately',
        description: 'This is a lengthy description that could potentially span multiple lines and test the card\'s ability to handle overflow. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
};

export const EmptyDescription: Story = {
    args: {
        title: 'Task without description',
        description: '',
    }
};

export const Minimal: Story = {
    args: {
        title: 'Minimal task',
        description: '',
        completionDatePlanned: undefined,
        completionDateActual: undefined,
    }
};

export const WithEditAction: Story = {
    args: {
        title: 'Task with edit button',
        description: 'Click the edit button to see action.',
        click: fn(),
    }
};
