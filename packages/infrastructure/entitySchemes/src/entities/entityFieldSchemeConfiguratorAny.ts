import { z } from 'zod';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';

export class EntityFieldSchemeConfiguratorAny extends EntityFieldSchemeConfiguratorOptionalBase<any>
{
    override createZodScheme(): z.ZodType<any>
    {
        return z.any();
    }
}