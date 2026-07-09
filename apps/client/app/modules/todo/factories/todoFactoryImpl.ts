import { ToDoFactory } from "./todoFactory";
import { ToDoBase } from "../entities/todoBase";
import type { ToDo } from '../entities/todo';
import type { ToDoData } from '../types/todoData';
import { Overlay } from '@/modules/overlay/entities/overlay';
import { FormFactory } from '@/modules/forms/factories/formFactory';
import { MessagesService } from '@client/shared';
import { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import { dependency } from '@client/di';

@dependency(Overlay)
@dependency(FormFactory)
@dependency(MessagesService)
@dependency(AppNotificationsStore)
export class ToDoFactoryImpl extends ToDoFactory
{
    constructor(
        private overlay: Overlay,
        private formFactory: FormFactory,
        private messagesService: MessagesService,
        private notificationsStore: AppNotificationsStore,
    )
    {
        super();
    }

    create(data?: Partial<ToDoData>): ToDo
    {
        const todo = new ToDoBase(this.overlay, this.notificationsStore, this.formFactory, this.messagesService);

        if (data)
        {
            todo.setData(data);
        }

        return todo;
    }
}