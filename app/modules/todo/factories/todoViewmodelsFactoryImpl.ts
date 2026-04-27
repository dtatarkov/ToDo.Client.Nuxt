import { ToDoViewmodelsFactory } from "../interfaces/todoViewmodelsFactory";
import { ToDoCard } from "../interfaces/todoCard";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardBase } from "../viewmodels/todoCardBase";

export class ToDoViewmodelsFactoryImpl extends ToDoViewmodelsFactory
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