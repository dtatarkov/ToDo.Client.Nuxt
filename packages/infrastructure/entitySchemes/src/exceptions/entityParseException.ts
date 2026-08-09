import type { ValidationMessage } from '@client/infrastructure-validation';

export class EntityParseException extends Error
{
    constructor(
        public readonly errors: Record<string, ValidationMessage[] | undefined>
    )
    {
        super('Entity parse failed');
    }
}
