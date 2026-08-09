import type { EntityScheme } from './entityScheme';
import { EntityDataUpdateException } from '../exceptions/entityDataUpdateException';
import type { ValidationMessage } from '@client/infrastructure-validation';
import type { OptionalUndefined } from '@client/shared';

export class EntityData<TInput extends Record<string, any>, TOutput extends TInput>
{
    private data: TOutput;

    constructor(
        initialData: OptionalUndefined<TInput>,
        private readonly scheme: EntityScheme<TInput, TOutput>,
    )
    {
        this.data = this.scheme.parse(initialData as unknown as OptionalUndefined<Record<keyof TInput, any>>);
    }

    get value(): TOutput
    {
        return this.data;
    }

    update(partial: Partial<TInput>): void
    {
        const newData = { ...this.data };
        const errors: Record<string, ValidationMessage[] | undefined> = {};

        for (const [key, value] of Object.entries(partial))
        {
            const field = this.scheme.fields[key as keyof TInput];

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
                newData[key as keyof TInput] = parseResult.value;
            }
        }

        const errorsCount = Object.keys(errors).length;

        if (errorsCount > 0)
        {
            throw new EntityDataUpdateException(errors);
        }

        this.data = newData;
    }
}
