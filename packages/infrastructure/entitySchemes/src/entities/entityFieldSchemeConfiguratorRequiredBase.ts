import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import type { EntityFieldSchemeConfiguratorRequired } from './entityFieldSchemeConfigurator';
import type { NonUndefined } from '@client/shared';
import type z from 'zod';
import type { ZodType } from 'zod';

export class EntityFieldSchemeConfiguratorRequiredBase<TValue>
    extends EntityFieldSchemeConfiguratorBase<NonUndefined<TValue>, NonUndefined<TValue>>
    implements EntityFieldSchemeConfiguratorRequired<TValue>
{
    constructor(protected zodScheme: z.ZodType<NonUndefined<TValue>>)
    {
        super();
    }

    protected getZodScheme(): ZodType<NonUndefined<TValue>>
    {
        return this.zodScheme;
    }
}
