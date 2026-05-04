import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { useObservable } from '@/modules/shared/composables/useObservable';
import { ShowAddToDoDialogUseCase } from '../interfaces/showAddToDoDialogUseCase';
import { ShowEditToDoDialogUseCase } from '../interfaces/showEditToDoDialogUseCase';
import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import VTodosWidget from '@/modules/todo/components/VToDosWidget.vue';

@dependency(InitializeToDosUseCase)
@dependency(GetToDoCardsUseCase)
@dependency(ShowAddToDoDialogUseCase)
@dependency(ShowEditToDoDialogUseCase)
export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
  readonly key = getUniqueId('todos-widget');

  override component = {
    setup: async () =>
    {
      const cards = useObservable(this.cards);

      const handleAddToDo = () => this.addToDo();
      const handleEditToDo = (card: ToDoCardDataWithIdentity) => this.editToDo(card.id);

      await this.initialize();

      return () => h(VTodosWidget, {
        cards: cards.value,

        onAddToDo: handleAddToDo,
        onEditToDo: handleEditToDo
      });
    }
  };

  cards: Observable<ToDoCardDataWithIdentity[]>;

  constructor(
    private readonly initializeUseCase: InitializeToDosUseCase,
    private readonly getToDoCardsUseCase: GetToDoCardsUseCase,
    private readonly showAddToDoDialogUseCase: ShowAddToDoDialogUseCase,
    private readonly showEditToDoDialogUseCase: ShowEditToDoDialogUseCase,
  )
  {
    super();

    this.cards = this.getToDoCardsUseCase.execute();
  }

  override async initialize(): Promise<void>
  {
    await this.initializeUseCase.executeAsync();
  }

  override addToDo(): void
  {
    this.showAddToDoDialogUseCase.execute();
  }

  override editToDo(id: string): void
  {
    this.showEditToDoDialogUseCase.executeAsync(id);
  }
}