import { ToDosWidgetViewmodel } from "../interfaces/todosWidgetViewmodel";
import { getUniqueId } from '@/modules/shared/utils/getUniqueId';
import { InitializeToDosUseCase } from '../interfaces/initializeToDosUseCase';
import { dependency } from '@/modules/shared/decorators/dependency';
import { ShowAddToDoDialogUseCase } from '../interfaces/showAddToDoDialogUseCase';
import { GetToDoCardsUseCase } from "../interfaces/getToDoCardsUseCase";
import VTodosWidget from '@/modules/todo/components/VToDosWidget.vue';
import type { ToolbarViewmodel } from '@/modules/uikit/interfaces/toolbarViewmodel';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import type { GridViewmodel } from '@/modules/uikit/interfaces/gridViewmodel';
import { ObservableComputed } from '@/modules/shared/entities/observableComputed';
import { ToDoViewmodelsFactory } from '../interfaces/todoViewmodelsFactory';

@dependency(InitializeToDosUseCase)
@dependency(GetToDoCardsUseCase)
@dependency(ShowAddToDoDialogUseCase)
@dependency(UIKitViewmodelsFactory)
@dependency(ToDoViewmodelsFactory)
export class ToDosWidgetViewmodelImpl extends ToDosWidgetViewmodel
{
  private readonly grid: GridViewmodel;
  private readonly toolbar: ToolbarViewmodel;

  readonly key = getUniqueId('todos-widget');

  override component = {
    setup: async () =>
    {
      await this.initializeToDosUseCase.executeAsync();

      return () => h(VTodosWidget, {}, {
        toolbar: () => h(this.toolbar.component),
        grid: () => h(this.grid.component)
      });
    }
  };

  constructor(
    private readonly initializeToDosUseCase: InitializeToDosUseCase,
    private readonly getToDoCardsUseCase: GetToDoCardsUseCase,
    private readonly showAddToDoDialogUseCase: ShowAddToDoDialogUseCase,
    private readonly uikitViewmodelsFactory: UIKitViewmodelsFactory,
    private readonly todoViewmodelsFactory: ToDoViewmodelsFactory,
  )
  {
    super();

    this.grid = this.createGrid();
    this.toolbar = this.createToolbar();
  }

  private createToolbar(): ToolbarViewmodel
  {
    const toolbar = this.uikitViewmodelsFactory.createToolbar<ButtonGeneralViewmodel>();

    const addButton = this.uikitViewmodelsFactory.createButtonGeneral({
      title: 'Добавить задание',
      click: () => this.showAddToDoDialogUseCase.execute()
    });

    toolbar.addElement(addButton);

    return toolbar;
  }

  private createGrid(): GridViewmodel
  {
    const cardsData = this.getToDoCardsUseCase.execute();

    const cards = new ObservableComputed(() =>
      cardsData.value.map(cardData =>
        this.todoViewmodelsFactory.createToDoCard(cardData)));

    const grid = this.uikitViewmodelsFactory.createGrid(cards);

    return grid;
  }
}