import { z } from 'zod';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';
import type { EntityFieldSchemeZodParams } from '../types/entityFieldSchemeZodParams';

export class EntityFieldSchemeConfiguratorBoolean extends EntityFieldSchemeConfiguratorOptionalBase<boolean>
{
    override createZodScheme(params: EntityFieldSchemeZodParams): z.ZodType<boolean>
    {
        return z.boolean(params);
    }
}
