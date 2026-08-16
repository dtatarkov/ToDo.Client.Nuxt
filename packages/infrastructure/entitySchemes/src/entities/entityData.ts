import { EntityScheme } from './entityScheme';
import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import type { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';
import { EntityDataUpdateException } from '../exceptions/entityDataUpdateException';
import type { ValidationMessage } from '@client/infrastructure-validation';
import type { OptionalUndefined } from '@client/shared';
import type { EntityFieldConfiguratorInput, EntityFieldConfiguratorOutput } from '../types/entitySchemeFieldConfigurators';

export class EntityData<TInput extends Record<string, any>, TOutput extends Record<string, any>>
{
    private data: TOutput;

    constructor(
        initialData: OptionalUndefined<TInput>,
        private readonly scheme: EntityScheme<TInput, TOutput>,
    )
    {
        this.data = this.scheme.parse(initialData as unknown as OptionalUndefined<Record<keyof TInput, any>>);
    }

    static create<T extends Record<string, EntityFieldSchemeConfigurator<any, any>>>(
        initialData: OptionalUndefined<EntityFieldConfiguratorInput<T>>,
        setup: (scheme: EntitySchemeConfigurator) => T
    ): EntityData<EntityFieldConfiguratorInput<T>, EntityFieldConfiguratorOutput<T>>
    {
        const scheme = EntityScheme.create(setup);
        const result = new EntityData(initialData, scheme);

        return result;
    }

    get value(): TOutput
    {
        return this.data;
    }

    update(partial: Partial<TInput>): void
    {
        const newData: Record<string, any> = { ...this.data };
        const errors: Record<string, ValidationMessage[] | undefined> = {};

        for (const [key, value] of Object.entries(partial))
        {
            const field = this.scheme.fields[key as any];

            if (!field)
            {
                continue;
            }

            const parseResult = field.tryParse(value);

            if ('errors' in parseResult)
            {
                errors[key] = parseResult.errors;
            }
            else
            {
                newData[key] = parseResult.value;
            }
        }

        const errorsCount = Object.keys(errors).length;

        if (errorsCount > 0)
        {
            throw new EntityDataUpdateException(errors);
        }

        this.data = newData as TOutput;
    }
}
