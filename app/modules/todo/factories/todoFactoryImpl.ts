import { ToDoFactory } from "../interfaces/todoFactory";
import { ToDoImpl } from "../entities/todoImpl";
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDo, ToDoData } from '../interfaces/todo';
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
        const todo = new ToDoImpl(this.stringService);

        if (data)
        {
            updatePropertiesWithData(todo, data);
        }

        return todo;
    }
}