import type { z } from 'zod';
import { ValidationError } from '../../shared/entities/validationError';
import { EntityFieldScheme } from './EntityFieldScheme';

export abstract class EntityFieldSchemeBase<TValue = any> extends EntityFieldScheme<TValue>
{
    constructor(protected zod4Scheme: z.ZodType<TValue>)
    {
        super();
    }

    override validate(value: TValue): ValidationError | undefined
    {
        const result = this.zod4Scheme.safeParse(value);

        if (!result.success)
        {
            return new ValidationError(result.error.issues[0]?.message ?? '');
        }

        return undefined;
    }
}

