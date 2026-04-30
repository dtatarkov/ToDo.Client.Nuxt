import { getCurrentInstance, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import type { ComponentInternalInstance } from 'vue';
import type { ServicesScope } from '../entities/internal/servicesContainer';
import { useServicesContainer } from './useServicesContainer';

/**
 * Symbol key used to store service scopes map in Nuxt app context.
 * The map associates each Vue component instance with its own service scope.
 */
export const serviceScopesKey = 'ServiceScopes';

/**
 * Provides a service scope tied to the current Vue component instance.
 *
 * This composable ensures each component has its own isolated service scope,
 * which is automatically destroyed when the component unmounts.
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
    // Retrieve the current Vue component instance; required for scoping.
    const instance = getCurrentInstance();

    if (instance == null)
    {
        throw new Error('Component instance is not available');
    }

    // Access Nuxt app context to store/retrieve scopes map.
    const nuxtApp = useNuxtApp();

    // Look up the existing map of component instances to service scopes.
    // The map is stored under a dynamically computed key (prefixed with '$').
    let scopes = nuxtApp[`$${serviceScopesKey}`] as Map<ComponentInternalInstance, ServicesScope> | undefined;

    // If no map exists yet, create one and attach it to the Nuxt app context.
    if (scopes == undefined)
    {
        scopes = new Map();
        nuxtApp[serviceScopesKey] = scopes;
    }

    // Try to find an existing scope for this component instance.
    let scope = scopes.get(instance);

    // If no scope exists for this instance, create a new one.
    if (scope == undefined)
    {
        // Obtain the global services container and create a child scope.
        const container = useServicesContainer();
        scope = container.createScope();

        // Store the new scope in the map for future reuse.
        scopes.set(instance, scope);

        // Automatically clean up the scope when the component unmounts.
        onUnmounted(() =>
        {
            scope?.destroy();
            scopes.delete(instance);
        });
    }

    return scope;
}
