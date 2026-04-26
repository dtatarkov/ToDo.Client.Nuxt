import type { ServicesScope } from '../entities/internal/servicesContainer';
import { useServicesContainer } from './useServicesContainer';

export const servicesScopeKey: InjectionKey<ServicesScope | undefined> = Symbol('$ServicesScope');

export function useServicesScope(): ServicesScope
{
    const instance = getCurrentInstance();

    if (instance == null)
    {
        throw new Error('Component instance is not available');
    }

    let scope = (instance as any).provides[servicesScopeKey] as ServicesScope | undefined;

    if (scope == undefined)
    {
        scope = inject(servicesScopeKey, undefined);
    }

    if (scope == undefined)
    {

        const container = useServicesContainer();
        scope = container.createScope();

        provide(servicesScopeKey, scope);
    }

    return scope;
}
