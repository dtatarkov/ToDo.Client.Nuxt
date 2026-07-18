import type { ServiceIdentifier } from '@client/infrastructure-di';
import { useServicesScope } from './useServicesScope';

export function useService<T>(identifier: ServiceIdentifier<T>): T
{
    const scope = useServicesScope();
    const service = scope.get(identifier);

    return service;
}
