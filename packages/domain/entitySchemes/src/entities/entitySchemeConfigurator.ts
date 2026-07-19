import type { EntityFieldStringSchemeConfigurator } from './entityFieldStringSchemeConfigurator';
import type { EntityFieldDateTimeSchemeConfigurator } from './entityFieldDateTimeSchemeConfigurator';
import type { EntityFieldHiddenSchemeConfigurator } from './entityFieldHiddenSchemeConfigurator';

export abstract class EntitySchemeConfigurator
{
    abstract string(): EntityFieldStringSchemeConfigurator;
    abstract datetime(): EntityFieldDateTimeSchemeConfigurator;
    abstract hidden(): EntityFieldHiddenSchemeConfigurator;
}