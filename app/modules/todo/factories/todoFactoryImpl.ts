import { ToDoFactory } from "./todoFactory";
import { ToDoBase } from "../entities/todoBase";
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import type { ToDo } from '../entities/todo';
import type { ToDoData } from '../types/todoData';

export class ToDoFactoryImpl extends ToDoFactory
{
    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase();

        if (data)
        {
            updatePropertiesWithData(todo, data);
        }

        return todo;
    }
}