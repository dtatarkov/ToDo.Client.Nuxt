import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import type { EntityFieldSchemeConfiguratorDefaulted } from './entityFieldSchemeConfigurator';
import type z from 'zod';
import type { ZodType } from 'zod';
import type { NonUndefined } from '@client/shared';

export class EntityFieldSchemeConfiguratorDefaultedBase<TValue>
    extends EntityFieldSchemeConfiguratorBase<TValue | undefined, NonUndefined<TValue>>
    implements EntityFieldSchemeConfiguratorDefaulted<TValue>
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
