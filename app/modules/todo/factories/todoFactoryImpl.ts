import { ToDoFactory } from "../interfaces/todoFactory";
import { ToDoBase } from "../entities/todoBase";
import { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDo, ToDoData } from '../interfaces/todo';

@dependency(FormViewmodelFactory)
@dependency(OverlayService)
export class ToDoFactoryImpl extends ToDoFactory
{
    constructor(
        private formFactory: FormViewmodelFactory,
        private overlayService: OverlayService
    )
    {
        super();
    }

    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase(this.formFactory, this.overlayService);

        if (data)
        {
            updatePropertiesWithData(todo, data);
        }

        return todo;
    }
}