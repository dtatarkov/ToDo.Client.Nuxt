import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import type { ToDoCardDataWithIdentity } from '../types/todoCardData';
import { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';
import { dependency } from '@/modules/shared/decorators/dependency';
import { GetToDosUseCase } from '../interfaces/getToDosUseCase';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import type { Observable } from '@/modules/shared/interfaces/observable';
import { useObservable } from '@/modules/shared/composables/useObservable';
import { ShowAddToDoDialogUseCase } from '../interfaces/showAddToDoDialogUseCase';
import { ShowEditToDoDialogUseCase } from '../interfaces/showEditToDoDialogUseCase';
import { ToDoCardDataMapper } from "../interfaces/todoCardDataMapper";
import { defineAsyncComponent } from 'vue';

@dependency(InitializeToDosUseCase)
@dependency(GetToDosUseCase)
@dependency(ShowAddToDoDialogUseCase)
@dependency(ShowEditToDoDialogUseCase)
@dependency(ToDoCardDataMapper)
export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
  private view = defineAsyncComponent(() => import('@/modules/todo/widgets/VToDosWidget.vue'));

  readonly key = getUniqueId('todos-widget');

  override component = {
    setup: async () =>
    {
      const cards = useObservable(this.cards);

      const handleAddToDo = () => this.addToDo();
      const handleEditToDo = (card: ToDoCardDataWithIdentity) => this.editToDo(card.id);

      await this.initialize();

      return () => h(this.view, {
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
    private readonly showEditToDoDialogUseCase: ShowEditToDoDialogUseCase,
    private readonly todoCardDataMapper: ToDoCardDataMapper
  )
  {
    super();

    const todos = this.getToDosUseCase.execute();

    this.cards = new ObservableComputed(() => todos.value.map(todo => this.todoCardDataMapper.mapToCardData(todo)));
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