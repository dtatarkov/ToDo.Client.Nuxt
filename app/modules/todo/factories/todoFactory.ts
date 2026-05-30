import type { ToDo } from "../entities/todo";
import type { ToDoData } from '../types/todoData';

export abstract class ToDoFactory
{
    abstract create(data?: Partial<ToDoData>): ToDo;
}