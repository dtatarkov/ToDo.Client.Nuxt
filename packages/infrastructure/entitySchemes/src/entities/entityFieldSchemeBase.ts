import type { z } from 'zod';
import { ValidationMessage } from '@client/infrastructure-validation';
import { EntityFieldScheme } from './entityFieldScheme';
import { EntityFieldParseException } from '../exceptions/entityFieldParseException';
import type { MessageKey } from '../../../../infrastructure/messages/src/types/messageKey';

export class EntityFieldSchemeBase<TValue> extends EntityFieldScheme<TValue>
{
    constructor(
        private readonly zodSchema: z.ZodType<TValue>
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

    override parse(value: any): TValue
    {
        const result = this.zodSchema.safeParse(value);

        if (!result.success)
        {
            throw new EntityFieldParseException(
                result.error.issues.map(issue =>
                    new ValidationMessage(issue.message as MessageKey))
            );
        }

        return result.data;
    }
}
