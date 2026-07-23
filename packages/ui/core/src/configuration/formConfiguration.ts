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
        errors: Partial<Record<keyof TEntity, string>>
    ): FormConfiguration<TEntity>
    {
        const newElements = mapObject(this.elements, (elementData, elementName) => (<FormElementData>{
            ...elementData,

            errorKey: errors[elementName] ?? elementData.value
        }));

        return new FormConfiguration(newElements);
    }
}
