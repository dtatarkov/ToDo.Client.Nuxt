import type { BindingBuilder, ServiceIdentifier } from '@client/di';

export function useServiceRegistration<T>(
    identifier: ServiceIdentifier<T>
): BindingBuilder<T>
{
    const container = useServicesContainer();
    const builder = container.bind(identifier);

    return builder;
}
