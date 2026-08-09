import type { z } from 'zod';
import type { EntityFieldScheme } from './entityFieldScheme';
import { EntityFieldSchemeBase } from './entityFieldSchemeBase';
import type { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';

export abstract class EntityFieldSchemeConfiguratorBase<TInput, TOutput> implements EntityFieldSchemeConfigurator<TInput, TOutput>
{
    __ti!: TInput;
    __to!: TOutput;

    toScheme(): EntityFieldScheme<TOutput>
    {
        const zodScheme = this.getZodScheme();
        const fieldScheme = new EntityFieldSchemeBase(zodScheme);

        return fieldScheme;
    }

    protected abstract getZodScheme(): z.ZodType<TOutput>;
}
