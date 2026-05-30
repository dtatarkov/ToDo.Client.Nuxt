import { dependency } from '@/modules/shared/decorators/dependency';
import { EntityValidatorFactory } from './entityValidatorFactory';
import { EntityValidatorZod4 } from '../entities/entityValidatorZod4';
import { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';
import { UnknownErrorException } from '@/modules/shared/exceptions/unknownErrorException';
import type { EntityScheme } from '@/modules/shared/types/entityScheme';
import type { EntityValidator } from '../entities/entityValidator';

@dependency(AppPublicRuntimeConfig)
export class EntityValidatorFactoryCached extends EntityValidatorFactory
{
    private cache = new Map<EntityScheme<any>, EntityValidator<any>>();
    private maxCacheSize: number;

    constructor(
        private appConfig: AppPublicRuntimeConfig,
    )
    {
        super();
        this.maxCacheSize = appConfig.validatorsCacheSizeMax;
    }

    override getValidator<TEntity extends Record<string, any>>(
        scheme: EntityScheme<TEntity>
    ): EntityValidator<TEntity>
    {
        let validator = this.cache.get(scheme) as EntityValidator<TEntity> | undefined;

        if (!validator)
        {
            validator = new EntityValidatorZod4(scheme);

            if (this.maxCacheSize > 0 && this.cache.size >= this.maxCacheSize)
            {
                const firstKey = this.cache.keys().next().value;

                if (firstKey === undefined)
                {
                    throw new UnknownErrorException('Validator cache is corrupted');
                }

                this.cache.delete(firstKey);
            }

            this.cache.set(scheme, validator);
        }

        return validator;
    }
}