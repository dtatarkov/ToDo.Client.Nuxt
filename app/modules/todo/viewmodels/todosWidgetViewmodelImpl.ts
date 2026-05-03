import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { h } from 'vue';
import VToDosWidget from '@/modules/todo/widgets/VToDosWidget.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';
import { dependency } from '@/modules/shared/decorators/dependency';
import { GetToDosUseCase } from '../interfaces/getToDosUseCase';
import type { ToDo } from '../interfaces/todo';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { useObservable } from '@/modules/shared/composables/useObservable';
import { ShowAddToDoDialogUseCase } from '../interfaces/showAddToDoDialogUseCase';
import { ShowEditToDoDialogUseCase } from '../interfaces/showEditToDoDialogUseCase';

@dependency(InitializeToDosUseCase)
@dependency(GetToDosUseCase)
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

      return () => h(VToDosWidget, {
        cards: cards.value,

        onAddToDo: handleAddToDo,
        onEditToDo: handleEditToDo
      });
    }
  };

  cards: Observable<ToDoCardDataWithIdentity[]>;

  constructor(
    private readonly initializeUseCase: InitializeToDosUseCase,
    private readonly getToDosUseCase: GetToDosUseCase,
    private readonly showAddToDoDialogUseCase: ShowAddToDoDialogUseCase,
    private readonly showEditToDoDialogUseCase: ShowEditToDoDialogUseCase
  )
  {
    super();

    const todos = this.getToDosUseCase.execute();

    this.cards = new ObservableComputed(() => todos.value.map(todo => this.mapToCardData(todo)));
  }

  override async initialize(): Promise<void>
  {
    await this.initializeUseCase.execute();
  }

  override addToDo(): void
  {
    this.showAddToDoDialogUseCase.execute();
  }

  override editToDo(id: string): void
  {
    this.showEditToDoDialogUseCase.execute(id);
  }

  private mapToCardData(todo: ToDo): ToDoCardDataWithIdentity
  {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completionDateActual: todo.completionDateActual,
      completionDatePlanned: todo.completionDatePlanned
    };
  }
}