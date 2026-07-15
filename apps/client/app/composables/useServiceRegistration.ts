import type { BindingBuilder, ServiceIdentifier } from '@client/di';
import { useServicesContainer } from '@client/infrastructure-nuxt-utils';

export function useServiceRegistration<T>(
    identifier: ServiceIdentifier<T>
): BindingBuilder<T>
{
    const container = useServicesContainer();
    const builder = container.bind(identifier);

    return builder;
}
