import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { FormValidationResult } from '../types/formValidationResult';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';
import type { FormDataContext } from './formDataContext';
import { FormValidator } from './formValidator';

export class FormValidatorBase<TEntity extends Record<string, any> = Record<string, any>> extends FormValidator<TEntity>
{
    constructor(
        private elements: FormElementViewmodel[],
        private formDataContext: FormDataContext<TEntity>,
        private scheme?: EntityScheme<any, TEntity>,
    )
    {
        super();
    }

    override validate(): FormValidationResult<TEntity>
    {
        this.elements.forEach(element => element.validate());

        if (!this.scheme)
        {
            return { isValid: true, messages: {} };
        }

        const data = this.formDataContext.getData();
        const messages = this.scheme.validate(data);
        const isValid = Object.keys(messages).length === 0;

        return { isValid, messages };
    }
}
