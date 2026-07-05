/**
 * Decorator that caches method results using Nuxt's payload system for SSR.
 * 
 * On the server: executes the method and stores the result in the payload.
 * During hydration: returns the cached payload value without executing the method.
 * On the client: executes the method normally.
 * 
 * @param payloadKey - Key used to store/retrieve the result in the payload.
 * @returns Method decorator that enables SSR payload caching.
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

            // Client-side navigation — call the method normally
            return originalMethod.apply(this, args) as Return;
        };
    };
}
