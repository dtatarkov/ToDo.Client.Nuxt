import type { Meta, StoryObj } from '@nuxtjs/storybook';
import VToDosWidget from '../widgets/VToDosWidget.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { fn } from 'storybook/test';
import { Suspense } from 'vue';

const meta: Meta<typeof VToDosWidget> = {
  title: 'ToDo/VToDosWidget',
  component: VToDosWidget,

  args: {
    onAddToDo: fn(),
    onEditToDo: fn(),
  },

  render: (args) =>
  {
    return {
      components: { VToDosWidget, Suspense } as any,

      setup()
      {
        useAppServices();

        return { args };
      },

      template: `<Suspense>
          <VToDosWidget v-bind="args" />
        </Suspense>`
    };
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCards: ToDoCardDataWithIdentity[] = [
  {
    id: '1',
    title: 'Задача 1',
    description: 'Описание задачи 1',
    completionDateActual: undefined,
    completionDatePlanned: new Date('2026-12-31')
  },

  {
    id: '2',
    title: 'Задача 2',
    description: 'Описание задачи 2',
    completionDateActual: new Date('2026-05-01'),
    completionDatePlanned: new Date('2026-06-15')
  },

  {
    id: '3',
    title: 'Задача 3',
    description: 'Описание задачи 3',
    completionDateActual: undefined,
    completionDatePlanned: new Date('2026-07-20')
  }
];

export const Default: Story = {
  args: {
    cards: mockCards
  }
};

export const Empty: Story = {
  args: {
    cards: []
  }
};

export const WithSingleCard: Story = {
  args: {
    cards: mockCards.slice(0, 1),
  }
};