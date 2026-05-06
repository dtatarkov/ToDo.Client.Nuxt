import { ToDoCardDataMapper } from "../interfaces/todoCardDataMapper";
import type { ToDoData } from "../interfaces/todo";
import type { ToDoCardViewmodelData } from '../interfaces/todoCardViewmodel';

export class ToDoCardDataMapperImpl extends ToDoCardDataMapper
{
  mapToCardData(todo: ToDoData): ToDoCardViewmodelData
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