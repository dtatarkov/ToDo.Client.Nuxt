import type { MessageKey } from '@client/infrastructure-messages';
import type { FormData } from '../types/formData';
import type { FormElementCreateData } from '../types/formElementCreateData';
import type { FormElementData } from '../types/formElementData';

export type FormConfigurationToDataOptions<TEntity extends Record<string, any> = Record<string, any>> = {
    values?: Partial<TEntity>;
    errors?: Partial<Record<keyof TEntity, MessageKey>>;
};

export class FormConfiguration<TEntity extends Record<string, any> = Record<string, any>>
{
    constructor(
        public readonly elements: Record<keyof TEntity, FormElementCreateData>
    ) { }

    toData(options?: FormConfigurationToDataOptions<TEntity>): FormData
    {
        const elements = Object.entries(this.elements).map(([name, data]) =>
        {
            const element: FormElementData = { ...data, name };

            this.addValueToFormElementData(element, options?.values?.[name]);
            this.addErrorToFormElementData(element, options?.errors?.[name]);

            return element;
        });

        return { elements };
    }

    private addValueToFormElementData(element: FormElementData, value?: TEntity[keyof TEntity]): void
    {
        if (value !== undefined)
        {
            element.value = value;
        }
    }

    private addErrorToFormElementData(element: FormElementData, errorKey?: MessageKey): void
    {
        element.errorKey = errorKey;
        element.hasError = errorKey !== undefined;
    }
}

