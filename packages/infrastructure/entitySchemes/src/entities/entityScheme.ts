import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import type { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';
import type { EntitySchemeFields } from '../types/entitySchemeFields';
import { EntitySchemeConfiguratorImpl } from './entitySchemeConfiguratorImpl';
import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import { EntityFieldInvalidConfigurationException } from '../exceptions/entityFieldInvalidConfigurationException';
import { ValidationMessage } from '@client/infrastructure-validation';

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
        const configurator = new EntitySchemeConfiguratorImpl();
        const result = setup(configurator);

        const fields = Object.entries(result).reduce(
            (scheme, [fieldName, fieldConfigurator]) =>
            {
                if (!(fieldConfigurator instanceof EntityFieldSchemeConfiguratorBase))
                {
                    throw new EntityFieldInvalidConfigurationException(fieldName);
                }

                scheme[fieldName as keyof TEntity] = fieldConfigurator.toScheme();

                return scheme;
            },
            {} as EntitySchemeFields<TEntity>
        );

        return new EntityScheme(fields);
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

    parse(data: Record<keyof TEntity, any>): TEntity
    {
        const result = {} as TEntity;

        for (const [key, field] of Object.entries(this.fields))
        {
            result[key as keyof TEntity] = field.parse(data[key as keyof TEntity]);
        }

        return result;
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

    // static extend<TBase extends Record<string, any>, TExt extends Record<string, any>>(
    //     base: EntityScheme<TBase>,
    //     setup: (scheme: EntitySchemeConfigurator) => Record<keyof TExt, EntityFieldSchemeConfigurator>
    // ): EntityScheme<TBase & TExt>
    // {
    //     const extendedScheme = EntityScheme.create(setup);

    //     const fields = {
    //         ...base.getFields(),
    //         ...extendedScheme.getFields(),
    //     } as EntitySchemeFields<TBase & TExt>;

    //     return new EntityScheme(fields);
    // }

    // getFields(): EntitySchemeFields<TEntity>
    // {
    //     return this.fields;
    // }

    // getDefaults(): Partial<TEntity>
    // {
    //     return Object.entries(this.fields).reduce(
    //         (defaults, [key, field]) =>
    //         {
    //             const defaultValue = field.getDefaultValue();

    //             if (defaultValue !== undefined)
    //             {
    //                 (defaults as any)[key] = defaultValue;
    //             }

    //             return defaults;
    //         },
    //         {} as Partial<TEntity>
    //     );
    // }
}