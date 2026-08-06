import type { EntityScheme } from './entityScheme';
import { EntityDataUpdateException } from '../exceptions/entityDataUpdateException';

export class EntityData<TData extends Record<string, any>>
{
    private data: TData;

    constructor(
        initialData: TData,
        private readonly scheme: EntityScheme<TData>,

    )
    {
        this.data = { ...initialData };
    }

    get value(): TData
    {
        return this.data;
    }

    update(partial: Partial<TData>): void
    {
        const newData = { ...this.data };

        const throwUpdateException = () =>
        {
            const errors = this.scheme.validate({ ...this.data, ...partial });
            throw new EntityDataUpdateException(errors);
        };

        for (const [key, value] of Object.entries(partial))
        {
            const field = this.scheme.fields[key as keyof TData];

            try
            {
                newData[key as keyof TData] = field.parse(value);
            }
            catch
            {
                throwUpdateException();
            }
        }

        this.data = newData;
    }
}
