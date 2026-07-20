import { MessagesService } from '@client/infrastructure-messages';
import { useService } from './useService';

export function useMessages()
{
    const messages = useService(MessagesService);

    return {
        getMessage: messages.getMessage.bind(messages)
    };
}