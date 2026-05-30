import type { Reactive } from 'vue';
import type { ToDoData } from '../types/todoData';
import type { ToDoCardData } from '../types/todoCardData';

export abstract class ToDoCardDataMapper
{
  abstract mapToCardData(todo: ToDoData): Reactive<ToDoCardData>;
}