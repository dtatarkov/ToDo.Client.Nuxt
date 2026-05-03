import { ToDoCardDataMapper } from "../interfaces/todoCardDataMapper";
import type { ToDo } from "../interfaces/todo";
import type { ToDoCardDataWithIdentity } from "../types/todoCardData";

export class ToDoCardDataMapperImpl extends ToDoCardDataMapper
{
  mapToCardData(todo: ToDo): ToDoCardDataWithIdentity
  {
    const data = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completionDateActual: todo.completionDateActual,
      completionDatePlanned: todo.completionDatePlanned
    };

    return data;
  }
}