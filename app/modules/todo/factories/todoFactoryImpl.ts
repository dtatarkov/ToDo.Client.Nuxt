import { ToDoFactory } from "./todoFactory";
import { ToDoBase } from "../entities/todoBase";
import type { ToDo } from '../entities/todo';
import type { ToDoData } from '../types/todoData';
import { dependency } from '@/modules/shared/decorators/dependency';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { MessagesService } from '@/modules/shared/services/messagesService';
import { Notifier } from '@/modules/notifications/entities/notifier';

@dependency(Overlay)
@dependency(FormFactory)
@dependency(MessagesService)
@dependency(Notifier)
export class ToDoFactoryImpl extends ToDoFactory
{
    constructor(
        private overlay: Overlay,
        private formFactory: FormFactory,
        private messagesService: MessagesService,
        private notifier: Notifier,
    )
    {
        super();
    }

    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase(this.overlay, this.notifier, this.formFactory, this.messagesService);

        if (data)
        {
            todo.setData(data);
        }

        return todo;
    }
}