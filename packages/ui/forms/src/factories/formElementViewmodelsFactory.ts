import type { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { FormElementCreateData } from '../types/formElementCreateData';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';

export abstract class FormElementViewmodelsFactory
{
    abstract createViewmodels<TEntity extends Record<string, any>>(
        elementsData: Record<keyof TEntity, FormElementCreateData>,
        scheme?: EntityScheme<any, TEntity>
    ): FormElementViewmodel[];
}
