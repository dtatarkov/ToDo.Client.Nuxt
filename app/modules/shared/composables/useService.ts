import type { ServiceIdentifier } from '../types/serviceIdentifier';
import { ServicesScope } from '../entities/internal/servicesContainer';
import { useServicesScope } from './useServicesScope';

export const servicesScopeKey: InjectionKey<ServicesScope | undefined> = Symbol('$ServicesScope');

export function useService<T>(identifier: ServiceIdentifier<T>): T
{
    const scope = useServicesScope();
    const service = scope.get(identifier);

    return service;
}
