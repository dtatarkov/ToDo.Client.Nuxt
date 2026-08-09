import type { EntityScheme } from './entityScheme';
import { EntityDataUpdateException } from '../exceptions/entityDataUpdateException';
import type { ValidationMessage } from '@client/infrastructure-validation';

export class EntityData<TData extends Record<string, any>>
{
    private data: TData;

    constructor(
        initialData: TData,
        private readonly scheme: EntityScheme<TData>,
    )
    {
        this.data = this.scheme.parse(initialData);
    }

    get value(): TData
    {
        return this.data;
    }

    update(partial: Partial<TData>): void
    {
        const newData = { ...this.data };
        const errors: Record<string, ValidationMessage[] | undefined> = {};

        for (const [key, value] of Object.entries(partial))
        {
            const field = this.scheme.fields[key as keyof TData];

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
                newData[key as keyof TData] = parseResult.value;
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
