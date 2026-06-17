import { z } from 'zod';
import { EntityFieldDateTimeSchemeConfigurator } from './entityFieldDateTimeSchemeConfigurator';
import type { EntityFieldDateTimeData } from '../types/entityFieldDateTimeData';
import { EntityFieldDateTimeScheme } from './entityFieldDateTimeScheme';


export class EntityFieldDateTimeSchemeConfiguratorImpl extends EntityFieldDateTimeSchemeConfigurator
{
    private zod4Scheme = z.date().optional();
    private data: EntityFieldDateTimeData = {};

    withLabel(label: string): this
    {
        this.data.label = label;
        return this;
    }

    toScheme(): EntityFieldDateTimeScheme
    {
        return new EntityFieldDateTimeScheme(this.zod4Scheme, this.data);
    }
}
