import type { ToDoCardViewmodel, ToDoCardViewmodelData } from "./todoCardViewmodel";

export abstract class ToDoViewmodelsFactory
{
  abstract createToDoCard(todo?: ToDoCardViewmodelData): ToDoCardViewmodel;
}