import { getSSRProcessor } from '../entities/ssrProcessor';

/**
 * TypeScript 5 method decorator that caches method results via an SSR processor.
 * 
 * This decorator is abstract and doesn't know about Nuxt/Vue directly.
 * It delegates to a processor function that handles the actual SSR/hydration/client logic.
 * 
 * Behavior:
 * - Calls the processor function with the payloadKey and a function to execute
 * - The processor handles SSR mode, hydration mode, and client mode
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
            const processor = getSSRProcessor();

            const loader = () => originalMethod.apply(this, args);
            const result = processor(payloadKey, loader);

            return result as Return;
        };
    };
}
