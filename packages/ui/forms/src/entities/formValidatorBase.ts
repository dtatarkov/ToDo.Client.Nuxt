import { toObject } from '@client/shared';
import type { ObservableViewmodelState } from '@client/ui-core';
import type { FormValidationResult } from '../types/formValidationResult';
import type { FormViewmodelState } from '../types/formViewmodelState';
import type { FormElement } from './formElement';
import type { FormElementValidationError } from './formElementValidationError';
import { FormValidationError } from './formValidationError';
import { FormValidator } from './formValidator';


export class FormValidatorBase extends FormValidator
{
    constructor(
        private elements: FormElement[],
        private state: ObservableViewmodelState<FormViewmodelState<any>>
    )
    {
        super();
    }

    override validate(): FormValidationResult
    {
        this.elements.forEach(element => element.validate());

        const errorsList = this.getElementValidationErrors();
        const errorsObj = toObject(errorsList, error => error.formElementName);

        this.state.update({ errors: errorsObj });

        const isValid = errorsList.length === 0;

        if (isValid)
        {
            return { isValid };
        }

        const validationError = new FormValidationError(errorsList);

        return { isValid, validationError };
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
