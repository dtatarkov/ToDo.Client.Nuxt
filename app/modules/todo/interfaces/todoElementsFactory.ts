import { ToDoCard } from "../interfaces/todoCard";
import type { ToDo } from "../interfaces/todo";

export abstract class ToDoElementsFactory
{
  abstract createToDoCard(todo: ToDo): ToDoCard;
}