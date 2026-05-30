import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { FormElementCreateData } from '../types/formElementCreateData';

export abstract class EntitySchemeToFormElementsMapper
{
    abstract map<TEntity extends Record<string, any>>(scheme: EntityScheme<TEntity>): Partial<Record<keyof TEntity, FormElementCreateData>>;
}