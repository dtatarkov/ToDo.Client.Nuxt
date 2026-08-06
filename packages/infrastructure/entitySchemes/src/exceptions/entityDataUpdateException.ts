import type { ValidationMessage } from '@client/infrastructure-validation';

export class EntityDataUpdateException extends Error
{
    constructor(
        public readonly errors: Record<string, ValidationMessage[] | undefined>
    )
    {
        super('Entity data update failed');
        this.name = 'EntityDataUpdateException';
    }
}
