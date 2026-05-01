import { ToDoCardViewmodel } from "./todoCardViewmodel";
import type { ToDo } from "./todo";

export abstract class ToDoViewmodelsFactory
{
  abstract createToDoCard(todo?: ToDo): ToDoCardViewmodel;
}