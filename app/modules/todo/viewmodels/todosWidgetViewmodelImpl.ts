import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { h } from 'vue';
import VToDosWidget from '@/modules/todo/widgets/VToDosWidget.vue';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';
import { dependency } from '@/modules/shared/decorators/dependency';
import { GetToDosUseCase } from '../interfaces/getToDosUseCase';
import { EffectsContainer } from '@/modules/shared/interfaces/effectsContainer';
import type { ToDo } from '../interfaces/todo';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { useObservable } from '@/modules/shared/composables/useObservable';

@dependency(InitializeToDosUseCase)
@dependency(GetToDosUseCase)
@dependency(EffectsContainer)
export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
  readonly key = getUniqueId('todos-widget');

  override component = {
    setup: () =>
    {
      const cards = useObservable(this.cards);

      const initialize = () => this.initialize();
      const handleAddToDo = () => this.addToDo();
      const handleEditToDo = (card: ToDoCardDataWithIdentity) => this.editToDo(card.id);

      return () => h(VToDosWidget, {
        cards: cards.value,

        initialize,
        onAddToDo: handleAddToDo,
        onEditToDo: handleEditToDo
      });
    }
  };

  cards: Observable<ToDoCardDataWithIdentity[]>;

  constructor(
    private readonly initializeUseCase: InitializeToDosUseCase,
    private readonly getToDosUseCase: GetToDosUseCase
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
    // Implementation for adding a new todo
    console.log('Adding new todo');
  }

  override editToDo(id: string): void
  {
    // Implementation for editing a todo with the given id
    console.log(`Editing todo with id: ${id}`);
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