import { z } from 'zod';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';

export class EntityFieldSchemeConfiguratorNumber extends EntityFieldSchemeConfiguratorOptionalBase<number>
{
    override createZodScheme(params: { error: (iss: { input: unknown; }) => MessageKey; }): z.ZodType<number>
    {
        return z.number(params);
    }
}
