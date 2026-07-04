import { InitializationToken } from '@/modules/shared/entities/initializationToken';
import { setupSSRProcessor } from '@packages/ssr';

const initializationToken = new InitializationToken();

export function setupSSR()
{
    if (initializationToken.isInitialized)
    {
        return;
    }

    initializationToken.initialize();

    setupSSRProcessor((payloadKey, loader) =>
    {
        const nuxt = useNuxtApp();

        function setPayload(payload: any)
        {
            nuxt.payload[payloadKey] = payload;
        }

        // SSR — execute and cache the result
        if (import.meta.server)
        {
            const result = loader();

            // Handle both sync and async (Promise) return values
            if (result instanceof Promise)
            {
                return result.then((promiseResult) =>
                {
                    setPayload(promiseResult);
                    return promiseResult;
                });
            }

            setPayload(result);
            return result;
        }

        // Hydration — return cached payload without calling the original method
        if (nuxt.isHydrating)
        {
            return nuxt.payload[payloadKey];
        }

        // Client-side navigation — call the execute function normally
        return loader();
    });
}
