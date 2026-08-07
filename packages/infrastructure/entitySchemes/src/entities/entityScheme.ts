import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import type { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';
import type { EntitySchemeFields } from '../types/entitySchemeFields';
import { EntitySchemeConfiguratorImpl } from './entitySchemeConfiguratorImpl';
import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import { EntityFieldInvalidConfigurationException } from '../exceptions/entityFieldInvalidConfigurationException';
import { ValidationMessage } from '@client/infrastructure-validation';
import type { OptionalUndefined } from '@client/shared';

export class EntityScheme<TEntity extends Record<string, any>>
{
    private constructor(
        public readonly fields: EntitySchemeFields<TEntity>
    )
    {
    }

    static create<TEntity extends Record<string, any>>(
        setup: (scheme: EntitySchemeConfigurator) => { [K in keyof TEntity]: EntityFieldSchemeConfigurator<TEntity[K]> }
    ): EntityScheme<TEntity>
    {
        const fields = EntityScheme.createFields(setup);
        const scheme = new EntityScheme(fields);

        return scheme;
    }

    validate<TData extends Record<string, any>>(data: TData): Partial<Record<keyof TEntity | keyof TData, ValidationMessage[]>>
    {
        const knownFieldsValidationResult: Record<string, ValidationMessage[]> = {};

        for (const [key, field] of Object.entries(this.fields))
        {
            const errors = field.validate(data[key as keyof TData]);

            if (errors.length > 0)
            {
                knownFieldsValidationResult[key] = errors;
            }
        }

        const unknownFieldsValidationResult = this.validateUnknownFields(data);

        const result = {
            ...knownFieldsValidationResult,
            ...unknownFieldsValidationResult,
        };

        return result as Partial<Record<keyof TEntity | keyof TData, ValidationMessage[]>>;
    }

    parse(data: OptionalUndefined<Record<keyof TEntity, any>>): TEntity
    {
        const result = {} as TEntity;

        for (const [key, field] of Object.entries(this.fields))
        {
            result[key as keyof TEntity] = field.parse(data[key as keyof OptionalUndefined<TEntity>]);
        }

        return result;
    }

    extend<TNew extends Record<string, any>>(
        setup: (configurator: EntitySchemeConfigurator) => { [K in keyof TNew]: EntityFieldSchemeConfigurator<TNew[K]> }
    ): EntityScheme<TEntity & TNew>
    {
        const newFields = EntityScheme.createFields(setup);

        const mergedFields = {
            ...this.fields,
            ...newFields,
        } as EntitySchemeFields<TEntity & TNew>;

        return new EntityScheme(mergedFields);
    }

    private validateUnknownFields<TData extends Record<string, any>>(data: TData)
    {
        const result: Record<string, ValidationMessage[]> = {};

        for (const [key] of Object.entries(data))
        {
            if (!this.fields[key as keyof TEntity])
            {
                result[key] = [new ValidationMessage('entity.field.unknown')];
            }
        }

        return result;
    }

    private static createFields<T extends Record<string, any>>(
        setup: (configurator: EntitySchemeConfigurator) => { [K in keyof T]: EntityFieldSchemeConfigurator<T[K]> }
    ): EntitySchemeFields<T>
    {
        const configurator = new EntitySchemeConfiguratorImpl();
        const result = setup(configurator);

        const fields = Object.entries(result).reduce(
            (scheme, [fieldName, fieldConfigurator]) =>
            {
                if (!(fieldConfigurator instanceof EntityFieldSchemeConfiguratorBase))
                {
                    throw new EntityFieldInvalidConfigurationException(fieldName);
                }

                scheme[fieldName as keyof T] = fieldConfigurator.toScheme();

                return scheme;
            },
            {} as EntitySchemeFields<T>
        );

        return fields;
    }
}