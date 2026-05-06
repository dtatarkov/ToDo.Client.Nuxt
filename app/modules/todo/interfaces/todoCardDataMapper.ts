import type { ToDoData } from "../interfaces/todo";
import type { ToDoCardViewmodelData } from './todoCardViewmodel';

export abstract class ToDoCardDataMapper
{
  abstract mapToCardData(todo: ToDoData): ToDoCardViewmodelData;
}