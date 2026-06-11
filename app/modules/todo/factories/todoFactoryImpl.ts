import { ToDoFactory } from "./todoFactory";
import { ToDoBase } from "../entities/todoBase";
import type { ToDo } from '../entities/todo';
import type { ToDoData } from '../types/todoData';
import { dependency } from '@/modules/shared/decorators/dependency';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { FormFactory } from '@/modules/forms/factories/formFactory';

@dependency(Overlay)
@dependency(FormFactory)
export class ToDoFactoryImpl extends ToDoFactory
{
    constructor(
        private overlay: Overlay,
        private formFactory: FormFactory,
    )
    {
        super();
    }

    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase(this.overlay, this.formFactory);

        if (data)
        {
            todo.setData(data);
        }

        return todo;
    }
}