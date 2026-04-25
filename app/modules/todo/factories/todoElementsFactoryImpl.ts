import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDoCard } from "../interfaces/todoCard";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardBase } from "../viewmodels/todoCardBase";

export class ToDoElementsFactoryImpl extends ToDoElementsFactory
{
  constructor()
  {
    super();
  }

  createToDoCard(todo: ToDo): ToDoCard
  {
    return new ToDoCardBase(todo);
  }
}