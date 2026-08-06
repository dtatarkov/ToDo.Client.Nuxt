import { z } from 'zod';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';

export class EntityFieldSchemeConfiguratorString extends EntityFieldSchemeConfiguratorOptionalBase<string>
{
    override createZodScheme(params: { error: (iss: { input: unknown; }) => MessageKey; }): z.ZodType<string>
    {
        return z.string(params);
    }
}
