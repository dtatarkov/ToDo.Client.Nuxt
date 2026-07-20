import { isStringEmpty, type Func } from '@client/shared';
import { MessagesService } from './messagesService';

export class MessagesServiceImpl extends MessagesService
{
    constructor(
        private t: Func<string, [key: string, params?: Record<string, string | number>]>,
    )
    {
        super();
    }

    override getMessage(key?: string, params?: Record<string, string | number>): string
    {
        if (isStringEmpty(key))
        {
            return '';
        }

        return this.t(key, params as Record<string, string | number>);
    }
}
