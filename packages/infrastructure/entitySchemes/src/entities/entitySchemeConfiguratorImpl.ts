import { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import { EntityFieldSchemeConfiguratorString } from './entityFieldSchemeConfiguratorString';
import { EntityFieldSchemeConfiguratorNumber } from './entityFieldSchemeConfiguratorNumber';
import { EntityFieldSchemeConfiguratorBoolean } from './entityFieldSchemeConfiguratorBoolean';
import { EntityFieldSchemeConfiguratorDate } from './entityFieldSchemeConfiguratorDate';
import type { EntityFieldSchemeConfiguratorOptional } from './entityFieldSchemeConfigurator';
import type { MessageKey } from '@client/infrastructure-messages';

export class EntitySchemeConfiguratorImpl extends EntitySchemeConfigurator
{
    override string(messageKey: MessageKey = 'entity.field.invalid'): EntityFieldSchemeConfiguratorOptional<string>
    {
        return new EntityFieldSchemeConfiguratorString(messageKey);
    }

    override number(messageKey: MessageKey = 'entity.field.invalid'): EntityFieldSchemeConfiguratorOptional<number>
    {
        return new EntityFieldSchemeConfiguratorNumber(messageKey);
    }

    override boolean(messageKey: MessageKey = 'entity.field.invalid'): EntityFieldSchemeConfiguratorOptional<boolean>
    {
        return new EntityFieldSchemeConfiguratorBoolean(messageKey);
    }

    override datetime(messageKey: MessageKey = 'entity.field.invalid'): EntityFieldSchemeConfiguratorOptional<Date>
    {
        return new EntityFieldSchemeConfiguratorDate(messageKey);
    }
}