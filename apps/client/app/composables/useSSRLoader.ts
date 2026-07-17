import type { SSRLoader } from '@client/infrastructure-ssr';
import type { Func } from '@client/shared';

/**
 * Composable that implements SSRLoader service using Nuxt's payload system.
 * 
 * On the server: executes the load function and stores the result in the payload.
 * During hydration: returns the cached payload value without executing the function.
 * On the client: executes the function normally.
 */
export function useSSRLoader(): SSRLoader
{
    const nuxt = useNuxtApp();

    function setPayload(key: string, payload: any)
    {
        nuxt.payload[key] = payload;
    }

    function load<T>(key: string, loadFn: Func<T>): T
    {
        // SSR — execute and cache the result
        if (import.meta.server)
        {
            const result = loadFn();

            // Handle both sync and async (Promise) return values
            if (result instanceof Promise)
            {
                return result.then((promiseResult) =>
                {
                    setPayload(key, promiseResult);
                    return promiseResult;
                }) as T;
            }

            setPayload(key, result);
            return result;
        }

        // Hydration — return cached payload without calling the load function
        if (nuxt.isHydrating && key in nuxt.payload)
        {
            return nuxt.payload[key] as T;
        }

        // Client-side navigation — call the function normally
        return loadFn();
    }

    return { load };
}
