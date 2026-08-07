import { z } from 'zod';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';
import type { EntityFieldSchemeZodParams } from '../types/entityFieldSchemeZodParams';

export class EntityFieldSchemeConfiguratorDate extends EntityFieldSchemeConfiguratorOptionalBase<Date>
{
    override createZodScheme(params: EntityFieldSchemeZodParams): z.ZodType<Date>
    {
        return z.date(params);
    }
}
