import type { z } from 'zod';
import type { EntityFieldScheme } from './entityFieldScheme';
import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';

export abstract class EntityFieldSchemeConfiguratorBase<TValue> implements EntityFieldSchemeConfigurator<TValue>
{
    __t!: TValue;

    toScheme(): EntityFieldScheme<TValue>
    {
        const zodScheme = this.getZodScheme();
        const fieldScheme = new EntityFieldSchemeBase(zodScheme);

        return fieldScheme;
    }

    protected abstract getZodScheme(): z.ZodType<TValue>;
}
