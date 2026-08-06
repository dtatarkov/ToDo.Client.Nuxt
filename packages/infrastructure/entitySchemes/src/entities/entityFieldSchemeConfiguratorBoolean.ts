import { z } from 'zod';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';

export class EntityFieldSchemeConfiguratorBoolean extends EntityFieldSchemeConfiguratorOptionalBase<boolean>
{
    override createZodScheme(params: { error: (iss: { input: unknown; }) => MessageKey; }): z.ZodType<boolean>
    {
        return z.boolean(params);
    }
}
