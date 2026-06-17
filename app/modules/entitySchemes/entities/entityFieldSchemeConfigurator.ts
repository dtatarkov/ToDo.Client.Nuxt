import type { EntityFieldScheme } from './EntityFieldScheme';

export abstract class EntityFieldSchemeConfigurator<TScheme extends EntityFieldScheme>
{
    abstract toScheme(): TScheme;
}