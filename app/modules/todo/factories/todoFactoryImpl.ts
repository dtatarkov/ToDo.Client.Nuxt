import { ToDoFactory } from "../interfaces/todoFactory";
import { ToDoBase } from "../entities/todoBase";
import { FormViewmodelFactory } from '@/modules/forms/interfaces/formViewmodelFactory';
import { OverlayService } from '@/modules/overlay/interfaces/overlayService';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ToDo, ToDoData } from '../interfaces/todo';
import { StringsService } from '@/modules/shared/interfaces/stringsService';

@dependency(FormViewmodelFactory)
@dependency(OverlayService)
@dependency(StringsService)
export class ToDoFactoryImpl extends ToDoFactory
{
    constructor(
        private formFactory: FormViewmodelFactory,
        private overlayService: OverlayService,
        private stringService: StringsService,
    )
    {
        super();
    }

    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase(this.formFactory, this.overlayService, this.stringService);

        if (data)
        {
            updatePropertiesWithData(todo, data);
        }

        return todo;
    }
}