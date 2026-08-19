import type { ToDoData } from '@client/domain-todo';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { InputType } from '@client/ui-uikit';
import { FormConfiguration } from '@client/ui-forms';

export function createToDoFormConfiguration(
    scheme?: EntityScheme<any, ToDoData>
): FormConfiguration<ToDoData>
{
    return new FormConfiguration<ToDoData>({
        id: {
            inputType: InputType.inputHidden,
        },

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

        completionDateActual: {
            inputType: InputType.inputHidden,
        },
    }, scheme);
}

export const todoFormConfiguration = createToDoFormConfiguration();
