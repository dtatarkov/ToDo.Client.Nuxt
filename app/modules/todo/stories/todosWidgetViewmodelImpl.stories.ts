import type { Meta, StoryObj } from '@nuxtjs/storybook';
import { fn } from 'storybook/test';
import type { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { useService } from '@/modules/shared/composables/useService';
import { ToDosWidgetViewmodelImpl } from '../viewmodels/todosWidgetViewmodelImpl';
import type { GetToDoCardsUseCase } from '../interfaces/getToDoCardsUseCase';
import { Suspense } from 'vue';
import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { ToDoCardViewmodelData } from '../interfaces/todoCardViewmodel';
import { ToDoViewmodelsFactory } from '../interfaces/todoViewmodelsFactory';
import type { CreateToDoUseCase } from '../usecases/createToDoUseCase';

type StoryArgs = {
  cards: ToDoCardViewmodelData[];
};

const meta: Meta<StoryArgs> = {
  title: 'ToDo/ToDosWidget',

  render: (args) =>
  {
    const initializeToDosUseCase = {
      executeAsync: fn(),
    } satisfies InitializeToDosUseCase;

    const getToDoCardsUseCase = {
      execute: fn(),
    } satisfies GetToDoCardsUseCase;

    getToDoCardsUseCase.execute.mockReturnValue(new ObservableSource(args.cards));

    const showAddToDoDialogUseCase = {
      execute: fn()
    } satisfies CreateToDoUseCase;

    return {
      components: { Suspense } as any,

      setup()
      {
        useAppServices();

        const uikitViewmodelsFactory = useService(UIKitViewmodelsFactory);
        const todoViewmodelsFactory = useService(ToDoViewmodelsFactory);

        const widget = new ToDosWidgetViewmodelImpl(
          initializeToDosUseCase,
          getToDoCardsUseCase,
          showAddToDoDialogUseCase,
          uikitViewmodelsFactory,
          todoViewmodelsFactory
        );

        return { widget };
      },

      template: `
        <Suspense>
          <component :is="widget.component" />
        </Suspense>`
    };
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCards: ToDoCardViewmodelData[] = [
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