import type { ToDoData } from '@client/domain-todo';
import { FormConfiguration } from './formConfiguration';
import { InputType } from '@client/ui-uikit';

export const todoFormConfiguration = new FormConfiguration<
    Omit<ToDoData, 'id' | 'completionDateActual'>
>({
    title: {
        inputType: InputType.inputText,
        labelKey: 'todo.field.title.label',
        placeholderKey: 'todo.field.title.placeholder',
    },

    description: {
        inputType: InputType.inputTextarea,
        labelKey: 'todo.field.description.label',
        placeholderKey: 'todo.field.description.placeholder',
    },

    completionDatePlanned: {
        inputType: InputType.inputDateTime,
        labelKey: 'todo.field.completionDatePlanned.label',
    },
});
