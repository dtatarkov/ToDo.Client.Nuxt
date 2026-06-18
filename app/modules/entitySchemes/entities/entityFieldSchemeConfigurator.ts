import type { EntityFieldScheme } from './entityFieldScheme';

export abstract class EntityFieldSchemeConfigurator<TScheme extends EntityFieldScheme>
{
    abstract toScheme(): TScheme;
}