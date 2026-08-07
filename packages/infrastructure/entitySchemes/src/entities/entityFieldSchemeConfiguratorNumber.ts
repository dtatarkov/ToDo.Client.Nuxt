import { z } from 'zod';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';
import type { EntityFieldSchemeZodParams } from '../types/entityFieldSchemeZodParams';

export class EntityFieldSchemeConfiguratorNumber extends EntityFieldSchemeConfiguratorOptionalBase<number>
{
    override createZodScheme(params: EntityFieldSchemeZodParams): z.ZodType<number>
    {
        return z.number(params);
    }
}
