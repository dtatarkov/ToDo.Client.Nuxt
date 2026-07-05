import type { EntitySchemeConfigurator } from './entitySchemeConfigurator';
import type { EntitySchemeFieldConfigurators } from '../types/entitySchemeFieldConfigurators';
import type { EntitySchemeFields } from '../types/entitySchemeFields';
import { EntitySchemeConfiguratorImpl } from './entitySchemeConfiguratorImpl';
import type { FormElementsCreateData } from '@/modules/forms/types/formElementsCreateData';
import { mapObject } from '@packages/shared';

export class EntityScheme<TEntity extends Record<string, any>>
{
    private constructor(
        public readonly fields: EntitySchemeFields<TEntity>
    )
    {

    }

    static create<TEntity extends Record<string, any>>(
        setup: (scheme: EntitySchemeConfigurator) => EntitySchemeFieldConfigurators<TEntity>
    ): EntityScheme<TEntity>
    {
        const configurator = new EntitySchemeConfiguratorImpl();
        const result = setup(configurator);

        const fields = Object.entries(result).reduce(
            (scheme, [fieldName, fieldConfigurator]) =>
            {
                scheme[fieldName as keyof EntitySchemeFields<TEntity>] = fieldConfigurator.toScheme();

                return scheme;
            },
            {} as EntitySchemeFields<TEntity>
        );

        const scheme = new EntityScheme(fields);

        return scheme;
    }

    getFormElementsData(): FormElementsCreateData
    {
        return mapObject(
            this.fields,
            (fieldScheme) => fieldScheme.getFormElementData()
        );
    }
}