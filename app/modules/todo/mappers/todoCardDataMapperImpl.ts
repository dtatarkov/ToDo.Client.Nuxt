import { ToDoCardDataMapper } from "../interfaces/todoCardDataMapper";
import type { ToDoData } from "../interfaces/todo";
import type { ToDoCardData } from '../types/todoCardData';

export class ToDoCardDataMapperImpl extends ToDoCardDataMapper
{
  mapToCardData(todo: ToDoData): ToDoCardData
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