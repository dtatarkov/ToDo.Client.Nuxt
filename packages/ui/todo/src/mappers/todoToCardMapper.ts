import type { ToDoData } from '@client/domain-todo';
import type { ToDoCardData } from '../types/todoCardData';

export abstract class ToDoToCardMapper
{
    abstract map(todo: ToDoData): ToDoCardData;
}
