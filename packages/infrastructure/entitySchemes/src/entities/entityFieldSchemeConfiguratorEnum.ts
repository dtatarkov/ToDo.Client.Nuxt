import { z } from 'zod';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorOptionalBase } from './entityFieldSchemeConfiguratorOptionalBase';
import type { EntityFieldSchemeZodParams } from '../types/entityFieldSchemeZodParams';

export class EntityFieldSchemeConfiguratorEnum<TEnum extends string>
    extends EntityFieldSchemeConfiguratorOptionalBase<TEnum>
{
    constructor(
        private readonly values: readonly TEnum[],
        invalidMessageKey?: MessageKey,
    )
    {
        super(invalidMessageKey);
    }

    override createZodScheme(params: EntityFieldSchemeZodParams): z.ZodType<any>
    {
        return z.enum(this.values, params);
    }
}
