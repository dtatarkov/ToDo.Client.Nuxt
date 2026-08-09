import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import type { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';
import type { EntitySchemeFields } from '../types/entitySchemeFields';
import { EntitySchemeConfiguratorImpl } from './entitySchemeConfiguratorImpl';
import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import { EntityFieldInvalidConfigurationException } from '../exceptions/entityFieldInvalidConfigurationException';
import { EntityParseException } from '../exceptions/entityParseException';
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

    validate<TData extends Record<string, any>>(data: TData): Partial<Record<keyof TEntity, ValidationMessage[]>>
    {
        const validationResult: Record<string, ValidationMessage[]> = {};

        for (const [key, field] of Object.entries(this.fields))
        {
            const errors = field.validate(data[key as keyof TData]);

            if (errors.length > 0)
            {
                validationResult[key] = errors;
            }
        }

        const result = validationResult as Partial<Record<keyof TEntity, ValidationMessage[]>>;

        return result;
    }

    parse(data: OptionalUndefined<Record<keyof TEntity, any>>): TEntity
    {
        const result = {} as TEntity;
        const errors: Record<string, ValidationMessage[] | undefined> = {};

        for (const key in this.fields)
        {
            const field = this.fields[key];
            const fieldValue = data[key as unknown as keyof OptionalUndefined<TEntity>];

            const parseResult = field.tryParse(fieldValue);

            if ('errors' in parseResult)
            {
                errors[key] = parseResult.errors;
            }
            else
            {
                result[key as keyof TEntity] = parseResult.value;
            }
        }

        const errorsCount = Object.keys(errors).length;

        if (errorsCount > 0)
        {
            throw new EntityParseException(errors);
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