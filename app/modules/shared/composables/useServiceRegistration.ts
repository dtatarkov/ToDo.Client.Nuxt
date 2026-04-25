import type { BindingBuilder } from '../entities/internal/servicesContainer';
import type { ServiceIdentifier } from '../types/serviceIdentifier';
import { useServicesContainer } from './useServicesContainer';

export function useServiceRegistration<T>(
    identifier: ServiceIdentifier<T>
): BindingBuilder<T>
{
    const container = useServicesContainer();
    const builder = container.bind(identifier);

    return builder;
}
