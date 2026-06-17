import type { EntityFieldDateTimeSchemeConfigurator } from './entityFieldDateTimeSchemeConfigurator';
import { EntityFieldDateTimeSchemeConfiguratorImpl } from './entityFieldDateTimeSchemeConfiguratorImpl';
import type { EntityFieldHiddenSchemeConfigurator } from './entityFieldHiddenSchemeConfigurator';
import { EntityFieldHiddenSchemeConfiguratorImpl } from './EntityFieldHiddenSchemeConfiguratorImpl';
import type { EntityFieldStringSchemeConfigurator } from './entityFieldStringSchemeConfigurator';
import { EntityFieldStringSchemeConfiguratorImpl } from './EntityFieldStringSchemeConfiguratorImpl';
import { EntitySchemeConfigurator } from './entitySchemeConfigurator';

export class EntitySchemeConfiguratorImpl extends EntitySchemeConfigurator
{
    override string(): EntityFieldStringSchemeConfigurator
    {
        return new EntityFieldStringSchemeConfiguratorImpl();
    }
    override datetime(): EntityFieldDateTimeSchemeConfigurator
    {
        return new EntityFieldDateTimeSchemeConfiguratorImpl();
    }
    override hidden(): EntityFieldHiddenSchemeConfigurator
    {
        return new EntityFieldHiddenSchemeConfiguratorImpl();
    }
}
