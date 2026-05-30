import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import { EntityFieldTag } from '@/modules/shared/enums/entityFieldTag';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import { FormElementType } from '../enums/formElementType';
import type { FormElementCreateData } from '../types/formElementCreateData';
import { EntitySchemeToFormElementsMapper } from './entitySchemeToFormElementsMapper';
import type { EntityFieldScheme } from '@/modules/shared/types/entityFieldScheme';

export class EntitySchemeToFormElementsMapperImpl extends EntitySchemeToFormElementsMapper
{
    override map<TEntity extends Record<string, any>>(scheme: EntityScheme<TEntity>): Partial<Record<keyof TEntity, FormElementCreateData>>
    {
        const elements: Partial<Record<keyof TEntity, FormElementCreateData>> = {};

        for (const [key, fieldScheme] of Object.entries(scheme))
        {
            const elementCreateData = this.mapField(fieldScheme);

            if (elementCreateData)
            {
                elements[key as keyof TEntity] = elementCreateData;
            }
        }

        return elements;
    }

    private mapField(fieldScheme: EntityFieldScheme): FormElementCreateData | undefined
    {
        switch (fieldScheme.type)
        {
            case EntityFieldType.string:
                return this.mapStringField(fieldScheme);

            case EntityFieldType.datetime:
                return this.mapDateTimeField(fieldScheme);

            default:
                return undefined;
        }
    }

    private mapStringField(fieldScheme: EntityFieldScheme): FormElementCreateData
    {
        const isLongText = fieldScheme.tags?.includes(EntityFieldTag.long);

        if (isLongText)
        {
            return {
                type: FormElementType.textarea,
                label: fieldScheme.label,
                placeholder: fieldScheme.placeholder,
            };
        }

        return {
            type: FormElementType.inputText,
            label: fieldScheme.label,
            placeholder: fieldScheme.placeholder,
        };
    }

    private mapDateTimeField(fieldScheme: EntityFieldScheme): FormElementCreateData
    {
        return {
            type: FormElementType.inputDateTime,
            label: fieldScheme.label,
        };
    }
}