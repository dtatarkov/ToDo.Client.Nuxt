import { EntityFieldSchemeConfigurator } from './entityFieldSchemeConfigurator';
import type { EntityFieldStringScheme } from './entityFieldStringScheme';

export abstract class EntityFieldStringSchemeConfigurator extends EntityFieldSchemeConfigurator<EntityFieldStringScheme>
{
    abstract withLabel(label: string): this;
    abstract withPlaceholder(placeholder: string): this;
    abstract isRequired(message: string): this;
    abstract isLong(): this;
}

