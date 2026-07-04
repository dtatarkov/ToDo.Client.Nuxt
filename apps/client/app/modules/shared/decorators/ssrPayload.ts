/**
 * TypeScript 5 method decorator that caches method results in Nuxt SSR payload.
 *
 * Behavior:
 * - **SSR mode** (`import.meta.server`): Calls the original method, saves the result
 *   into `nuxtApp.payload[payloadKey]`, and returns it.
 * - **Hydration mode** (`nuxtApp.isHydrating`): Returns the value from
 *   `nuxtApp.payload[payloadKey]` without calling the original method.
 * - **Client mode** (neither SSR nor hydration): Calls the original method normally.
 *
 * @param payloadKey - The payload key under which the result is stored/retrieved.
 *
 * @example
 * ```typescript
 * class MyService {
 *   @ssrPayload('data')
 *   async getData(): Promise<Data> { ... }
 * }
 * ```
 */
export function ssrPayload<This, Args extends any[], Return>(payloadKey: string)
{
    return function (
        originalMethod: (this: This, ...args: Args) => Return,
        context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ): (this: This, ...args: Args) => Return
    {
        if (context.kind !== 'method')
        {
            throw new TypeError('@ssrPayload decorator can only be applied to a method.');
        }

        return function (this: This, ...args: Args): Return
        {
            const nuxt = useNuxtApp();

            function setPayload(payload: any)
            {
                nuxt.payload[payloadKey] = payload;
            }

            // SSR — execute and cache the result
            if (import.meta.server)
            {
                const result = originalMethod.apply(this, args);

                // Handle both sync and async (Promise) return values
                if (result instanceof Promise)
                {
                    return result.then((promiseResult) =>
                    {
                        setPayload(promiseResult);
                        return promiseResult;
                    }) as Return;
                }

                setPayload(result);
                return result;
            }

            // Hydration — return cached payload without calling the original method
            if (nuxt.isHydrating)
            {
                return nuxt.payload[payloadKey] as Return;
            }

            // Client-side navigation — call the original method normally
            return originalMethod.apply(this, args);
        };
    };
}
