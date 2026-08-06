import { z } from 'zod';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';

export class EntityFieldSchemeConfiguratorDate extends EntityFieldSchemeConfiguratorOptionalBase<Date>
{
    override createZodScheme(params: { error: (iss: { input: unknown; }) => MessageKey; }): z.ZodType<Date>
    {
        return z.date(params);
    }
}
