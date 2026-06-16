import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { ToDoData } from '../types/todoData';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import { ToDoState } from './todoState';
import type { ToDoBase } from './todoBase';
import type { MessagesService } from '@/modules/shared/services/messagesService';

export abstract class ToDoStateBase extends ToDoState
{
    protected scheme: EntityScheme<ToDoData>;

    constructor(
        protected todo: ToDoBase,
        protected messagesService: MessagesService,
    )
    {
        super();

        this.scheme = {
            id: {
                type: EntityFieldType.hidden,
            },

            title: {
                type: EntityFieldType.string,
                label: this.messagesService.getMessage('todo.field.title.label'),
                placeholder: this.messagesService.getMessage('todo.field.title.placeholder'),
                isRequired: true,
            },

            description: {
                type: EntityFieldType.string,
                label: this.messagesService.getMessage('todo.field.description.label'),
                placeholder: this.messagesService.getMessage('todo.field.description.placeholder'),
                isLong: true,
            },

            completionDatePlanned: {
                type: EntityFieldType.datetime,
                label: this.messagesService.getMessage('todo.field.completionDatePlanned.label'),
            },

            completionDateActual: {
                type: EntityFieldType.hidden,
            },
        };
    }
}