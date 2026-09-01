import type { ToDoAddData, ToDoUpdateData } from '@client/domain-todo';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import { InputType } from '@client/ui-uikit';
import { FormConfiguration } from '@client/ui-forms';
import type { FormElementCreateDataForValue } from '@client/ui-forms';

const titleField: FormElementCreateDataForValue<string> = {
    inputType: InputType.inputText,
    labelKey: 'todo.field.title.label',
    placeholderKey: 'todo.field.title.placeholder',
};

const descriptionField: FormElementCreateDataForValue<string> = {
    inputType: InputType.inputTextarea,
    labelKey: 'todo.field.description.label',
    placeholderKey: 'todo.field.description.placeholder',
};

const completionDatePlannedField: FormElementCreateDataForValue<Date | undefined> = {
    inputType: InputType.inputDateTime,
    labelKey: 'todo.field.completionDatePlanned.label',
};

export function createToDoAddFormConfiguration(
    scheme?: EntityScheme<any, ToDoAddData>
): FormConfiguration<ToDoAddData>
{
    return new FormConfiguration<ToDoAddData>({
        title: titleField,
        description: descriptionField,
        completionDatePlanned: completionDatePlannedField,
    }, scheme);
}

export function createToDoUpdateFormConfiguration(
    scheme?: EntityScheme<any, ToDoUpdateData>
): FormConfiguration<ToDoUpdateData>
{
    return new FormConfiguration<ToDoUpdateData>({
        id: { inputType: InputType.inputHidden },
        title: titleField,
        description: descriptionField,
        completionDatePlanned: completionDatePlannedField,
    }, scheme);
}