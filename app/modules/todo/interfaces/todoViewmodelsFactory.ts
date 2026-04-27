import { ToDoCard } from "./todoCard";
import type { ToDo } from "./todo";

export abstract class ToDoViewmodelsFactory
{
  abstract createToDoCard(todo: ToDo): ToDoCard;
}