import { MessagesService } from './messagesService';

export class MessagesServiceImpl extends MessagesService
{
    constructor(
        private t: (key: string, params?: Record<string, string | number>) => string,
    )
    {
        super();
    }

    override getMessage(key: string, params?: Record<string, string | number>): string
    {
        return this.t(key, params as Record<string, string | number>);
    }
}