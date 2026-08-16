import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import type { EntityFieldScheme } from './entityFieldScheme';
import type { EntitySchemeFields } from '../types/entitySchemeFields';
import { EntitySchemeConfiguratorImpl } from './entitySchemeConfiguratorImpl';
import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import { EntityFieldInvalidConfigurationException } from '../exceptions/entityFieldInvalidConfigurationException';
import { EntityParseException } from '../exceptions/entityParseException';
import { ValidationMessage } from '@client/infrastructure-validation';
import type { OptionalUndefined } from '@client/shared';
import type { EntitySchemeFieldConfigurators, EntityFieldConfiguratorInput, EntityFieldConfiguratorOutput } from '../types/entitySchemeFieldConfigurators';

export class EntityScheme<TInput extends object, TOutput extends Record<string, any> = TInput>
{
    private constructor(
        public readonly fields: EntitySchemeFields<TOutput>
    )
    {
    }

    static create<C extends EntitySchemeFieldConfigurators<any, any>>(
        setup: (scheme: EntitySchemeConfigurator) => C
    ): EntityScheme<EntityFieldConfiguratorInput<C>, EntityFieldConfiguratorOutput<C>>
    {
        const fields = EntityScheme.createFields(setup);
        const scheme = new EntityScheme(fields);

        return scheme as EntityScheme<EntityFieldConfiguratorInput<C>, EntityFieldConfiguratorOutput<C>>;
    }

    validate<TData extends Record<string, any>>(data: TData): Partial<Record<keyof TOutput, ValidationMessage[]>>
    {
        const validationResult: Record<string, ValidationMessage[]> = {};

        for (const key in this.fields)
        {
            const field = this.fields[key];
            const errors = field.validate(data[key as keyof TData]);

            if (errors.length > 0)
            {
                validationResult[key] = errors;
            }
        }

        const result = validationResult as Partial<Record<keyof TOutput, ValidationMessage[]>>;

        return result;
    }

    parse(data: OptionalUndefined<Record<keyof TInput, any>>): TOutput
    {
        const result = {} as TOutput;
        const errors: Record<string, ValidationMessage[] | undefined> = {};

        for (const key in this.fields)
        {
            const field = this.fields[key];
            const fieldValue = data[key as unknown as keyof OptionalUndefined<TInput>];

            const parseResult = field.tryParse(fieldValue as any);

            if ('errors' in parseResult)
            {
                errors[key] = parseResult.errors;
            }
            else
            {
                result[key as keyof TOutput] = parseResult.value;
            }
        }

        const errorsCount = Object.keys(errors).length;

        if (errorsCount > 0)
        {
            throw new EntityParseException(errors);
        }

        return result;
    }

    extend<T extends EntitySchemeFieldConfigurators<any, any>>(
        setup: (configurator: EntitySchemeConfigurator) => T
    ): EntityScheme<EntityFieldConfiguratorInput<T> & TInput, EntityFieldConfiguratorOutput<T> & TOutput>
    {
        const newFields = EntityScheme.createFields(setup);

        const mergedFields = {
            ...this.fields,
            ...newFields,
        } as EntitySchemeFields<EntityFieldConfiguratorOutput<T> & TOutput>;

        return new EntityScheme(mergedFields);
    }

    private static createFields<T extends EntitySchemeFieldConfigurators<any, any>>(
        setup: (configurator: EntitySchemeConfigurator) => T
    ): EntitySchemeFields<EntityFieldConfiguratorOutput<T>>
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

                scheme[fieldName as string] = fieldConfigurator.toScheme();

                return scheme;
            },
            {} as Record<string, EntityFieldScheme<any>>
        );

        return fields as EntitySchemeFields<EntityFieldConfiguratorOutput<T>>;
    }
}