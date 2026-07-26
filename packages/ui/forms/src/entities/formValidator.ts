import type { FormElement } from './formElement';
import { FormValidationError } from '../entities/formValidationError';
import { FormElementValidationError } from '../entities/formElementValidationError';
import { ObservableViewmodelState } from '@client/ui-core';
import { toObject } from '@client/shared';
import type { FormViewmodelState } from '../types/formViewmodelState';

export class FormValidator
{
    private validationErrorInternal: FormValidationError | undefined = undefined;

    constructor(
        private elements: FormElement[],
        private state: ObservableViewmodelState<FormViewmodelState<any>>
    ) { }

    validate(): void
    {
        this.elements.forEach(element => element.validate());

        const elementValidationErrors = this.getElementValidationErrors();
        const errors = toObject(elementValidationErrors, error => error.formElementName);

        this.validationErrorInternal = elementValidationErrors.length > 0
            ? new FormValidationError(elementValidationErrors)
            : undefined;

        this.state.update({
            errors
        });
    }

    isValid(): boolean
    {
        const isValid = this.elements.every(element => element.isValid());
        return isValid;
    }

    get validationError(): FormValidationError | undefined
    {
        return this.validationErrorInternal;
    }

    private getElementValidationErrors(): FormElementValidationError[]
    {
        return this.elements.reduce((result, element) =>
        {
            const error = element.getError();

            if (error)
            {
                result.push(error);
            }

            return result;
        }, new Array<FormElementValidationError>());
    }
}
