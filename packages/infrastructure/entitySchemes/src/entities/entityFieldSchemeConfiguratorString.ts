import { z } from 'zod';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';
import type { EntityFieldSchemeZodParams } from '../types/entityFieldSchemeZodParams';

export class EntityFieldSchemeConfiguratorString extends EntityFieldSchemeConfiguratorOptionalBase<string>
{
    override createZodScheme(params: EntityFieldSchemeZodParams): z.ZodType<string>
    {
        return z.string(params);
    }
}
