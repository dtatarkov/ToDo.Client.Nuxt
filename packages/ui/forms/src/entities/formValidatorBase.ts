import type { ObservableViewmodelState } from '@client/ui-core';
import type { FormValidationResult } from '../types/formValidationResult';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';
import { FormValidator } from './formValidator';
import type { FormElementValidationError } from './formElementValidationError';
import { FormValidationError } from './formValidationError';
import type { FormState } from '../types/formState';


export class FormValidatorBase extends FormValidator
{
    constructor(
        private elements: FormElementViewmodel[],
        private state: ObservableViewmodelState<FormState>
    )
    {
        super();
    }

    override validate(): FormValidationResult
    {
        this.elements.forEach(element => element.validate());

        const errorsList = this.getElementValidationErrors();
        //const errorsObj = toObject(errorsList, error => error.formElementName);

        //this.state.update({ errors: errorsObj });

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
