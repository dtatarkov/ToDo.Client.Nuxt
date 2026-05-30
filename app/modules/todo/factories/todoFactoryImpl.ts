import { ToDoFactory } from "./todoFactory";
import { ToDoBase } from "../entities/todoBase";
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDo } from '../entities/todo';
import type { ToDoData } from '../types/todoData';
import { StringsService } from '@/modules/shared/interfaces/stringsService';

@dependency(StringsService)
export class ToDoFactoryImpl extends ToDoFactory
{
    constructor(
        private stringService: StringsService,
    )
    {
        super();
    }

    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase(this.stringService);

        if (data)
        {
            updatePropertiesWithData(todo, data);
        }

        return todo;
    }
}