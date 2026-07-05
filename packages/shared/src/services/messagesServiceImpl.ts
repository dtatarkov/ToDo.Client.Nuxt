import type { Func } from '../types/func';
import { MessagesService } from './messagesService';

export class MessagesServiceImpl extends MessagesService
{
    constructor(
        private t: Func<string, [key: string, params?: Record<string, string | number>]>,
    )
    {
        super();
    }

    override getMessage(key: string, params?: Record<string, string | number>): string
    {
        return this.t(key, params as Record<string, string | number>);
    }
}