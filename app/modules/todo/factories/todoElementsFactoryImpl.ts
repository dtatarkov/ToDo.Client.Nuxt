import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDoCard } from "../interfaces/todoCard";
import { ToDosService } from "../interfaces/todosService";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardBase } from "../viewmodels/todoCardBase";
import { DatesService } from '@/modules/shared/interfaces/datesService';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(ToDosService)
@dependency(DatesService)
export class ToDoElementsFactoryImpl extends ToDoElementsFactory
{
  constructor(
    private todosService: ToDosService,
    private datesService: DatesService
  )
  {
    super();
  }

  createToDoCard(todo: ToDo): ToDoCard
  {
    const card = new ToDoCardBase(this.todosService, this.datesService);

    updatePropertiesWithData(card, {
      ...todo.getData(),
    });

    return card;
  }
}