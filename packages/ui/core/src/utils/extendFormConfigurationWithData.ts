import { mapObject } from '@client/shared';
import type { FormConfiguration } from '../types/formConfiguration';
import type { FormElementData } from '../types/formElementData';

/**
 * Adds data properties to a form configuration
 * @param configuration - The form configuration to extend
 * @param data - Partial data to add to the configuration
 * @returns A new form configuration with the added data
 */

export function extendFormConfigurationWithData<
    TEntity extends Record<string, any> = Record<string, any>
>(
    configuration: FormConfiguration<TEntity>,
    data: Partial<TEntity>
): FormConfiguration<TEntity>
{
    const newElements = mapObject(configuration.elements, (elementData, elementName) => (<FormElementData>{
        ...elementData,
        value: data[elementName] ?? elementData.value
    }));

    return {
        elements: newElements,
    };
}
