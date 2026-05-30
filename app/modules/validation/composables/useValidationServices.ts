import { useServiceRegistration } from '@/modules/shared/composables/useServiceRegistration';
import { EntityValidatorFactory } from '../factories/entityValidatorFactory';
import { EntityValidatorFactoryCached } from '../factories/entityValidatorFactoryCached';

export function useValidationServices(): void
{
    useServiceRegistration(EntityValidatorFactory)
        .to(EntityValidatorFactoryCached)
        .asSingleton();
}