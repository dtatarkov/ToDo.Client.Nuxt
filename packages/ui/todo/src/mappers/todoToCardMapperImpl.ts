import { ToDoToCardMapper } from './todoToCardMapper';
import type { ToDoData } from '@client/domain-todo';
import type { ToDoCardData } from '../types/todoCardData';

export class ToDoToCardMapperImpl extends ToDoToCardMapper
{
    override map(todo: ToDoData): ToDoCardData
    {
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            completionDateActual: todo.completionDateActual,
            completionDatePlanned: todo.completionDatePlanned,
        };
    }
}
