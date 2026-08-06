import type { MessageKey } from '@client/infrastructure-messages';

export type EntityFieldSchemeZodParams = {
    error: (iss: {
        input: unknown;
    }) => MessageKey;
} | MessageKey;
