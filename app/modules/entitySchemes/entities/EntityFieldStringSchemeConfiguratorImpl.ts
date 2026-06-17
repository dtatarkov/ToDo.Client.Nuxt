import { EntityFieldStringSchemeConfigurator } from './entityFieldStringSchemeConfigurator';
import type { EntityFieldStringData } from '../types/entityFieldStringData';
import { z } from 'zod';
import { EntityFieldInvalidConfigurationException } from '../exceptions/entityFieldInvalidConfigurationException';
import { EntityFieldStringScheme } from './entityFieldStringScheme';


export class EntityFieldStringSchemeConfiguratorImpl extends EntityFieldStringSchemeConfigurator
{
    private zod4Scheme = z.string();
    private data: EntityFieldStringData = {};
    private isRequiredCalled = false;

    withLabel(label: string): this
    {
        this.data.label = label;
        return this;
    }

    withPlaceholder(placeholder: string): this
    {
        this.data.placeholder = placeholder;
        return this;
    }

    isRequired(message: string): this
    {
        if (this.isRequiredCalled)
        {
            throw new EntityFieldInvalidConfigurationException(
                'isRequired can only be called once'
            );
        }

        this.isRequiredCalled = true;
        this.zod4Scheme = this.zod4Scheme.nonempty(message);
        return this;
    }

    isLong(): this
    {
        this.data.isLong = true;
        return this;
    }

    toScheme(): EntityFieldStringScheme
    {
        return new EntityFieldStringScheme(this.zod4Scheme, this.data);
    }
}
