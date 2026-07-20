import type { ToDoData } from '@client/domain-todo';
import type { FormConfig } from '../types/formConfig';
import { FormElementType } from '../enums/formElementType';

export const todoFormConfig: FormConfig<Omit<ToDoData, 'id' | 'completionDateActual'>> = {
    elements: {
        title: {
            type: FormElementType.inputText,
            labelKey: 'todo.field.title.label',
            placeholderKey: 'todo.field.title.placeholder',
        },

        description: {
            type: FormElementType.inputTextarea,
            labelKey: 'todo.field.description.label',
            placeholderKey: 'todo.field.description.placeholder',
        },

        completionDatePlanned: {
            type: FormElementType.inputDateTime,
            labelKey: 'todo.field.completionDatePlanned.label',
        },
    }
};