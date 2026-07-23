import type { MessageKey } from '@client/infrastructure-messages';
import type { FormElementData } from '../types/formElementData';
import { mapObject } from '@client/shared';

export class FormConfiguration<TEntity extends Record<string, any> = Record<string, any>>
{
    constructor(
        public readonly elements: Record<keyof TEntity, FormElementData>
    ) { }

    withData(data: Partial<TEntity>): FormConfiguration<TEntity>
    {
        const newElements = mapObject(this.elements, (elementData, elementName) => (<FormElementData>{
            ...elementData,
            value: data[elementName] ?? elementData.value
        }));

        return new FormConfiguration(newElements);
    }

    withErrors(
        errors: Partial<Record<keyof TEntity, MessageKey>>
    ): FormConfiguration<TEntity>
    {
        const newElements = mapObject(this.elements, (elementData, elementName) =>
        {
            const errorKey = errors[elementName] ?? elementData.errorKey;
            const hasError = errorKey !== undefined;

            return (<FormElementData>{
                ...elementData,

                errorKey,
                hasError,
            });
        });

        return new FormConfiguration(newElements);
    }
}
