import type { ToDoData } from '../types/todoData';
import { ToDoState } from './todoState';
import type { ToDoBase } from './todoBase';
import type { MessagesService } from '@packages/shared';
import { EntityScheme } from '@/modules/entitySchemes/entities/entityScheme';

export abstract class ToDoStateBase extends ToDoState
{
    protected scheme: EntityScheme<ToDoData>;

    constructor(
        protected todo: ToDoBase,
        protected messagesService: MessagesService,
    )
    {
        super();

        this.scheme = EntityScheme.create<ToDoData>(scheme => ({
            id: scheme.hidden(),

            title: scheme
                .string()
                .withLabel(this.messagesService.getMessage('todo.field.title.label'))
                .withPlaceholder(this.messagesService.getMessage('todo.field.title.placeholder'))
                .isRequired('Заполните название задачи'),

            description: scheme
                .string()
                .withLabel(this.messagesService.getMessage('todo.field.description.label'))
                .withPlaceholder(this.messagesService.getMessage('todo.field.description.placeholder'))
                .isLong(),

            completionDatePlanned: scheme
                .datetime()
                .withLabel(this.messagesService.getMessage('todo.field.completionDatePlanned.label')),

            completionDateActual: scheme.hidden(),
        }));
    }
}