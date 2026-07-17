import type { ServiceIdentifier } from '@client/infrastructure-di';

export function useService<T>(identifier: ServiceIdentifier<T>): T
{
    const scope = useServicesScope();
    const service = scope.get(identifier);

    return service;
}
