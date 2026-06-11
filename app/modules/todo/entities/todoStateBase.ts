import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { ToDoData } from '../types/todoData';
import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import { ToDoState } from './todoState';
import type { ToDoBase } from './todoBase';

export abstract class ToDoStateBase extends ToDoState
{
    protected scheme: EntityScheme<ToDoData> = {
        id: {
            type: EntityFieldType.hidden,
        },

        title: {
            type: EntityFieldType.string,
            label: 'Название задачи',
            placeholder: 'Введите название задачи',
            isRequired: true,
        },

        description: {
            type: EntityFieldType.string,
            label: 'Описание задачи',
            placeholder: 'Введите описание задачи',
            isLong: true,
        },

        completionDatePlanned: {
            type: EntityFieldType.datetime,
            label: 'Плановая дата выполнения',
        },

        completionDateActual: {
            type: EntityFieldType.hidden,
        },
    };

    constructor(
        protected todo: ToDoBase,
    )
    {
        super();
    }
}