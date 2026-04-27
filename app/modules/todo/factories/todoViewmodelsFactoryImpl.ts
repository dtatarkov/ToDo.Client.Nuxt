import { ToDoViewmodelsFactory } from "../interfaces/todoViewmodelsFactory";
import { ToDoCardViewmodel } from "../interfaces/todoCardViewmodel";
import type { ToDo } from "../interfaces/todo";
import { ToDoCardViewmodelImpl } from "../viewmodels/todoCardViewmodelImpl";

export class ToDoViewmodelsFactoryImpl extends ToDoViewmodelsFactory
{
  constructor()
  {
    super();
  }

  createToDoCard(todo: ToDo): ToDoCardViewmodel
  {
    return new ToDoCardViewmodelImpl(todo);
  }
}