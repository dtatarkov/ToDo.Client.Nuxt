import type { EntityFieldDateTimeScheme } from './entityFieldDateTimeScheme';
import { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';

export abstract class EntityFieldDateTimeSchemeConfigurator extends EntityFieldSchemeConfigurator<EntityFieldDateTimeScheme>
{
    abstract withLabel(label: string): this;
}