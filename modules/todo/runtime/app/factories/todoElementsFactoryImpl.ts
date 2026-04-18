import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDoCard } from "../interfaces/todoCard";
import type { ToDosService } from "../interfaces/todosService";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardBase } from "../viewmodels/todoCardBase";

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