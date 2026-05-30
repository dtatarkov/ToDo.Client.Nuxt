import { EntityFieldType } from '@/modules/shared/enums/entityFieldType';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import { FormElementType } from '../enums/formElementType';
import type { FormElementCreateData } from '../types/formElementCreateData';
import { EntitySchemeToFormElementsMapper } from './entitySchemeToFormElementsMapper';
import type { EntityFieldScheme } from '@/modules/shared/types/entityFieldScheme';
import { dependency } from '@/modules/shared/decorators/dependency';
import { EntityValidatorFactory } from '@/modules/validation/factories/entityValidatorFactory';

@dependency(EntityValidatorFactory)
export class EntitySchemeToFormElementsMapperImpl extends EntitySchemeToFormElementsMapper
{
    constructor(
        private entityValidatorFactory: EntityValidatorFactory,
    )
    {
        super();
    }

    override map<TEntity extends Record<string, any>>(scheme: EntityScheme<TEntity>): Partial<Record<keyof TEntity, FormElementCreateData>>
    {
        const validator = this.entityValidatorFactory.getValidator(scheme);
        const elements: Partial<Record<keyof TEntity, FormElementCreateData>> = {};

        for (const [key, fieldScheme] of Object.entries(scheme))
        {
            const elementCreateData = this.mapField(fieldScheme);

            if (elementCreateData)
            {
                const fieldKey = key as keyof TEntity;

                elementCreateData.validate = (value: TEntity[keyof TEntity]) =>
                    validator.validateField(fieldKey, value);

                elements[fieldKey] = elementCreateData;
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
        if (fieldScheme.type != EntityFieldType.string)
        {
            throw new Error('invalid field type');
        }

        const isLongText = fieldScheme.isLong;

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
        if (fieldScheme.type != EntityFieldType.datetime)
        {
            throw new Error('invalid field type');
        }

        return {
            type: FormElementType.inputDateTime,
            label: fieldScheme.label,
        };
    }
}