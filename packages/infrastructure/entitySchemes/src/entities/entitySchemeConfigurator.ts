import type { EntityFieldSchemeConfiguratorOptional } from './entityFieldSchemeConfigurator';

export abstract class EntitySchemeConfigurator
{
    abstract string(): EntityFieldSchemeConfiguratorOptional<string>;
    abstract number(): EntityFieldSchemeConfiguratorOptional<number>;
    abstract boolean(): EntityFieldSchemeConfiguratorOptional<boolean>;
    abstract datetime(): EntityFieldSchemeConfiguratorOptional<Date>;
    abstract enum<TEnum extends string>(values: readonly TEnum[]): EntityFieldSchemeConfiguratorOptional<TEnum>;
}