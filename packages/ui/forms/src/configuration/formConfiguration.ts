import type { MessageKey } from '@client/infrastructure-messages';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { InputType } from '@client/ui-uikit';
import type { FormElementCreateData } from '../types/formElementCreateData';
import type { FormElementData } from '../types/formElementData';
import type { FormElementValue } from '../types/formElementValue';
import type { FormDataPartial } from '../types/formDataPartial';

export type FormConfigurationToDataOptions<TEntity extends Record<string, any> = Record<string, any>> = {
    values?: Partial<TEntity>;
    errors?: Partial<Record<keyof TEntity, MessageKey>>;
};

// 1. Which VISIBLE InputTypes are compatible with a given value type?
//    inputHidden is excluded — hidden is not a value-derived editor
type InputTypesForValue<TValue> = {
    [TType in Exclude<InputType, InputType.inputHidden>]:
    FormElementValue<TType> extends TValue | undefined ? TType : never
}[Exclude<InputType, InputType.inputHidden>];

// 2. Visible editors compatible with the value type
export type FormElementCreateDataForValue<TValue> = Extract<
    FormElementCreateData,
    { inputType: InputTypesForValue<TValue>; }
>;

// 3. The hidden carrier — explicit opt-in for non-editable fields
type FormElementHiddenCreateData = Extract<
    FormElementCreateData,
    { inputType: InputType.inputHidden; }
>;

// 4. Every property must be configured: visible (compatible) or explicitly hidden
export type FormConfigurationElements<TEntity extends Record<string, any>> = {
    [K in keyof TEntity]: FormElementCreateDataForValue<TEntity[K]> | FormElementHiddenCreateData;
};

export class FormConfiguration<TEntity extends Record<string, any> = Record<string, any>>
{
    constructor(
        public readonly elements: FormConfigurationElements<TEntity>,
        public readonly scheme?: EntityScheme<any, TEntity>
    ) { }

    toData(options?: FormConfigurationToDataOptions<TEntity>): FormDataPartial
    {
        const elements = Object.entries(this.elements).map(([name, data]) =>
        {
            const element: Partial<FormElementData> = {
                ...data,
                name
            };

            this.addValueToFormElementData(element, options?.values?.[name]);
            this.addErrorToFormElementData(element, options?.errors?.[name]);

            return element;
        });

        return { elements };
    }

    private addValueToFormElementData(element: Partial<FormElementData>, value?: TEntity[keyof TEntity]): void
    {
        if (value !== undefined)
        {
            element.value = value;
        }
    }

    private addErrorToFormElementData(element: Partial<FormElementData>, errorKey?: MessageKey): void
    {
        element.errorKey = errorKey;
        element.hasError = errorKey !== undefined;
    }
}

