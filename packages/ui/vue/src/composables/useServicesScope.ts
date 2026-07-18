import type { ServicesScope } from '@client/infrastructure-di';
import { injectServicesContainer } from './injectServicesContainer';
import { useComponentInstance } from './useComponentInstance';

/**
 * Symbol key used to store service scopes map in Nuxt app context.
 * The map associates each Vue component instance with its own service scope.
 */
export const serviceScopesKey = '$ServiceScopes';

/**
 * Provides a service scope tied to the current Vue component instance.
 *
 * This composable ensures each component has its own isolated service scope,
 * which is automatically disposed when the component unmounts.
 *
 * The scope is stored in Nuxt app context under a symbol key, using a map
 * from component instance to scope. If a scope already exists for the instance,
 * it is reused; otherwise a new scope is created via the global services container.
 *
 * @returns {ServicesScope} The service scope for the current component instance.
 *
 * @throws {Error} If called outside of a Vue component context (no current instance).
 *
 * @example
 * ```ts
 * const scope = useServicesScope();
 * const service = scope.get(MyService);
 * ```
 */
export function useServicesScope(): ServicesScope
{
    const instance = useComponentInstance();

    let scope = (instance as any).provides[serviceScopesKey] as ServicesScope | undefined;

    if (!scope)
    {
        const container = injectServicesContainer();
        scope = container.createScope();

        (instance as any).provides[serviceScopesKey] = scope;
    }

    return scope;
}
