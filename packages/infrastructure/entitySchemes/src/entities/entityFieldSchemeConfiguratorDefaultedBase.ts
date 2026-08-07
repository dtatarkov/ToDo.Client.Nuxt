import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import type { EntityFieldSchemeConfiguratorDefaulted } from './entityFieldSchemeConfigurator';
import type z from 'zod';
import type { ZodType } from 'zod';

export class EntityFieldSchemeConfiguratorDefaultedBase<TValue>
    extends EntityFieldSchemeConfiguratorBase<TValue>
    implements EntityFieldSchemeConfiguratorDefaulted<TValue>
{
    constructor(protected zodScheme: z.ZodType<TValue>)
    {
        super();
    }

    protected getZodScheme(): ZodType<TValue>
    {
        return this.zodScheme;
    }
}
