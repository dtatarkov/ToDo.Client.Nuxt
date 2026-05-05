import { ToDoViewmodelsFactory } from "../interfaces/todoViewmodelsFactory";
import type { ToDoCardViewmodel } from "../interfaces/todoCardViewmodel";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardViewmodelImpl } from "../viewmodels/todoCardViewmodelImpl";
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { StringsService } from '@/modules/shared/interfaces/stringsService';
import { ShowEditToDoDialogUseCase } from '../interfaces/showEditToDoDialogUseCase';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(UIKitViewmodelsFactory)
@dependency(DatesService)
@dependency(StringsService)
@dependency(ShowEditToDoDialogUseCase)
export class ToDoViewmodelsFactoryImpl extends ToDoViewmodelsFactory
{
  constructor(
    private readonly uikitFactory: UIKitViewmodelsFactory,
    private readonly datesService: DatesService,
    private readonly stringsService: StringsService,
    private readonly showEditToDoDialogUseCase: ShowEditToDoDialogUseCase,
  )
  {
    super();
  }

  createToDoCard(todo?: ToDo): ToDoCardViewmodel
  {
    const card = new ToDoCardViewmodelImpl(this.uikitFactory, this.datesService, this.stringsService, this.showEditToDoDialogUseCase);

    if (todo)
    {
      card.setSource(todo.toObservableData());
    }

    return card;
  }
}