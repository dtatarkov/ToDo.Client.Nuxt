import type { ToDo } from "../interfaces/todo";
import type { ToDoCardDataWithIdentity } from "../types/todoCardData";

export abstract class ToDoCardDataMapper
{
  abstract mapToCardData(todo: ToDo): ToDoCardDataWithIdentity;
}