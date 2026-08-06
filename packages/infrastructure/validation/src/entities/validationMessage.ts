import type { MessageKey } from '@client/infrastructure-messages';

export class ValidationMessage
{
    constructor(
        public readonly messageKey: MessageKey
    ) { }
}
