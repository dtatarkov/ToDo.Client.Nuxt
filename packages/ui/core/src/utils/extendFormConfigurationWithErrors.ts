import { mapObject } from '@client/shared';
import type { FormConfiguration } from '../types/formConfiguration';
import type { FormElementData } from '../types/formElementData';
import type { MessageKey } from '@client/infrastructure-messages';

/**
 * Adds validation errors to a form configuration
 * @param configuration - The form configuration to extend
 * @param errors - Partial errors to add to the configuration
 * @returns A new form configuration with the added errors
 */

export function extendFormConfigurationWithErrors<
    TEntity extends Record<string, any> = Record<string, any>
>(
    configuration: FormConfiguration<TEntity>,
    errors: Partial<Record<keyof TEntity, MessageKey>>
): FormConfiguration<TEntity>
{
    const newElements = mapObject(configuration.elements, (elementData, elementName) => (<FormElementData>{
        ...elementData,

        errorKey: errors[elementName] ?? elementData.value
    }));

    return {
        elements: newElements,
    };
}
