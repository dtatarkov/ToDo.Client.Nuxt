import type { z } from 'zod';
import { ValidationMessage } from '@client/infrastructure-validation';
import { EntityFieldScheme } from './entityFieldScheme';
import { EntityFieldParseException } from '../exceptions/entityFieldParseException';
import type { MessageKey } from '../../../../infrastructure/messages/src/types/messageKey';

export class EntityFieldSchemeBase<TOutput> extends EntityFieldScheme<TOutput>
{
    constructor(
        private readonly zodSchema: z.ZodType<TOutput>
    )
    {
        super();
    }

    override validate(value: any): ValidationMessage[]
    {
        const result = this.zodSchema.safeParse(value);

        if (!result.success)
        {
            return result.error.issues.map(issue =>
                new ValidationMessage(issue.message as MessageKey));
        }

        return [];
    }

    override tryParse(value: any): { value: TOutput; } | { errors: ValidationMessage[]; }
    {
        const result = this.zodSchema.safeParse(value);

        if (!result.success)
        {
            return {
                errors: result.error.issues.map(issue =>
                    new ValidationMessage(issue.message as MessageKey)),
            };
        }

        return { value: result.data };
    }

    override parse(value: any): TOutput
    {
        const result = this.tryParse(value);

        if ('errors' in result)
        {
            throw new EntityFieldParseException(result.errors);
        }

        return result.value;
    }
}
