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
import type { ToolbarViewmodel } from '@/modules/uikit/interfaces/toolbarViewmodel';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';

@dependency(InitializeToDosUseCase)
@dependency(GetToDoCardsUseCase)
@dependency(ShowAddToDoDialogUseCase)
@dependency(ShowEditToDoDialogUseCase)
@dependency(UIKitViewmodelsFactory)
export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
  readonly key = getUniqueId('todos-widget');

  override component = {
    setup: async () =>
    {
      const cards = useObservable(this.cards);

      const handleEditToDo = (card: ToDoCardDataWithIdentity) => this.editToDo(card.id);

      await this.initialize();

      return () => h(VTodosWidget, {
        cards: cards.value,

        onEditToDo: handleEditToDo
      }, {
        toolbar: () => h(this.toolbar.component)
      });
    }
  };

  readonly cards: Observable<ToDoCardDataWithIdentity[]>;
  readonly toolbar: ToolbarViewmodel;

  constructor(
    private readonly initializeToDosUseCase: InitializeToDosUseCase,
    private readonly getToDoCardsUseCase: GetToDoCardsUseCase,
    private readonly showAddToDoDialogUseCase: ShowAddToDoDialogUseCase,
    private readonly showEditToDoDialogUseCase: ShowEditToDoDialogUseCase,
    private readonly uikitViewmodelsFactory: UIKitViewmodelsFactory
  )
  {
    super();

    this.cards = this.getToDoCardsUseCase.execute();
    this.toolbar = this.createToolbar();
  }

  override async initialize(): Promise<void>
  {
    await this.initializeToDosUseCase.executeAsync();
  }

  override addToDo(): void
  {
    this.showAddToDoDialogUseCase.execute();
  }

  override editToDo(id: string): void
  {
    this.showEditToDoDialogUseCase.executeAsync(id);
  }

  private createToolbar(): ToolbarViewmodel
  {
    const toolbar = this.uikitViewmodelsFactory.createToolbar<ButtonGeneralViewmodel>();

    const addButton = this.uikitViewmodelsFactory.createButtonGeneral({
      title: 'Добавить задание',
      click: () => this.addToDo()
    });

    toolbar.addElement(addButton);

    return toolbar;
  }
}