import { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import { EntityFieldSchemeConfiguratorString } from './entityFieldSchemeConfiguratorString';
import { EntityFieldSchemeConfiguratorNumber } from './entityFieldSchemeConfiguratorNumber';
import { EntityFieldSchemeConfiguratorBoolean } from './entityFieldSchemeConfiguratorBoolean';
import { EntityFieldSchemeConfiguratorDate } from './entityFieldSchemeConfiguratorDate';
import { EntityFieldSchemeConfiguratorEnum } from './entityFieldSchemeConfiguratorEnum';
import { EntityFieldSchemeConfiguratorAny } from './entityFieldSchemeConfiguratorAny';
import type { EntityFieldSchemeConfiguratorOptional } from './entityFieldSchemeConfigurator';

export class EntitySchemeConfiguratorImpl extends EntitySchemeConfigurator
{
    string(): EntityFieldSchemeConfiguratorOptional<string>
    {
        return new EntityFieldSchemeConfiguratorString();
    }

    number(): EntityFieldSchemeConfiguratorOptional<number>
    {
        return new EntityFieldSchemeConfiguratorNumber();
    }

    boolean(): EntityFieldSchemeConfiguratorOptional<boolean>
    {
        return new EntityFieldSchemeConfiguratorBoolean();
    }

    datetime(): EntityFieldSchemeConfiguratorOptional<Date>
    {
        return new EntityFieldSchemeConfiguratorDate();
    }

    enum<TEnum extends string>(values: readonly TEnum[]): EntityFieldSchemeConfiguratorOptional<TEnum>
    {
        return new EntityFieldSchemeConfiguratorEnum(values);
    }

    any(): EntityFieldSchemeConfiguratorOptional<any>
    {
        return new EntityFieldSchemeConfiguratorAny();
    }
}