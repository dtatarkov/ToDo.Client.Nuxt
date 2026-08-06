import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import type { EntityFieldSchemeConfiguratorDefaulted } from './entityFieldSchemeConfigurator';
import type z from 'zod';
import type { ZodType } from 'zod';

export class EntityFieldSchemeConfiguratorDefaultedBase<TValue>
    extends EntityFieldSchemeConfiguratorBase<TValue | undefined>
    implements EntityFieldSchemeConfiguratorDefaulted<TValue>
{
    constructor(protected zodScheme: z.ZodType<TValue | undefined>)
    {
        super();
    }

    protected getZodScheme(): ZodType<TValue | undefined>
    {
        return this.zodScheme;
    }
}
