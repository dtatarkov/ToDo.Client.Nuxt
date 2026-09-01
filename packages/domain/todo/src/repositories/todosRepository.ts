import type { ToDoData } from '../types/todoData';
import type { ToDoAddData } from '../types/todoAddData';
import type { ToDoUpdateData } from '../types/todoUpdateData';

export abstract class ToDosRepository
{
    abstract getAllToDosAsync(): Promise<ToDoData[]>;
    abstract addToDoAsync(data: ToDoAddData): Promise<ToDoData>;
    abstract updateToDoAsync(data: ToDoUpdateData): Promise<ToDoData>;
}