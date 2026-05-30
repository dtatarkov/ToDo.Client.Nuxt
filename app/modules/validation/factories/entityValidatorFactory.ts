import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { EntityValidator } from '../entities/entityValidator';

export abstract class EntityValidatorFactory
{
    abstract getValidator<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): EntityValidator<TEntity>;
}