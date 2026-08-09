import type { EntityFieldSchemeConfiguratorOptional, EntityFieldSchemeConfiguratorRequired } from './entityFieldSchemeConfigurator';
import type { EntityFieldSchemeConfiguratorDefaulted } from './entityFieldSchemeConfigurator';
import type { MessageKey } from '@client/infrastructure-messages';
import { EntityFieldSchemeConfiguratorBase } from './entityFieldSchemeConfiguratorBase';
import { EntityFieldSchemeConfiguratorRequiredBase } from './entityFieldSchemeConfiguratorRequiredBase';
import { EntityFieldSchemeConfiguratorDefaultedBase } from './entityFieldSchemeConfiguratorDefaultedBase';
import type { z, ZodType } from 'zod';
import type { EntityFieldSchemeZodParams } from '../types/entityFieldSchemeZodParams';
import type { NonUndefined } from '@client/shared';

export abstract class EntityFieldSchemeConfiguratorOptionalBase<TValue>
    extends EntityFieldSchemeConfiguratorBase<TValue | undefined, TValue | undefined>
    implements EntityFieldSchemeConfiguratorOptional<TValue>
{
    constructor(protected readonly invalidMessageKey: MessageKey = 'entity.field.invalid')
    {
        super();
    }

    required(messageKey: MessageKey = 'entity.field.required'): EntityFieldSchemeConfiguratorRequired<TValue>
    {
        const zodScheme = this.createZodScheme({
            error: (iss) => iss.input == undefined ?
                messageKey :
                this.invalidMessageKey,
        });

        return new EntityFieldSchemeConfiguratorRequiredBase<TValue>(zodScheme);
    }

    withDefault(value: NonUndefined<TValue>): EntityFieldSchemeConfiguratorDefaulted<TValue>
    {
        const zodScheme = this.createZodScheme(this.invalidMessageKey).default(value as NonUndefined<NonUndefined<TValue>>);

        return new EntityFieldSchemeConfiguratorDefaultedBase<TValue>(zodScheme);
    }

    protected getZodScheme(): ZodType<TValue | undefined>
    {
        const zodScheme = this.createZodScheme(this.invalidMessageKey).optional();

        return zodScheme;
    }

    protected abstract createZodScheme(params: EntityFieldSchemeZodParams): z.ZodType<NonUndefined<TValue>>;
}
