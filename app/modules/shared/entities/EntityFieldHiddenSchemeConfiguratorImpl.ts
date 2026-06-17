import { z } from 'zod';
import { EntityFieldHiddenScheme } from './entityFieldHiddenScheme';
import { EntityFieldHiddenSchemeConfigurator } from './entityFieldHiddenSchemeConfigurator';


export class EntityFieldHiddenSchemeConfiguratorImpl extends EntityFieldHiddenSchemeConfigurator
{
    private zod4Scheme = z.any();

    toScheme(): EntityFieldHiddenScheme
    {
        return new EntityFieldHiddenScheme(this.zod4Scheme);
    }
}
