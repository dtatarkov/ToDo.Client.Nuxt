import type { ValidationMessage } from '@client/infrastructure-validation';

export class EntityFieldParseException extends Error
{
    constructor(
        public readonly errors: ValidationMessage[]
    )
    {
        super('Entity field parse failed');
    }
}
