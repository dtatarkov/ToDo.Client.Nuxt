type Func<R, T extends any[] = any[]> = (...args: T) => R;

let processor: Func<any, [string, Func<any>]> | undefined;

export function setupSSRProcessor<T = unknown>(processorFn: Func<T, [string, Func<T>]>)
{
    if (processor !== undefined)
    {
        throw new Error('Processor can only be set once.');
    }
    processor = processorFn;
}

export function getSSRProcessor<T = unknown>(): Func<T, [string, Func<T>]>
{
    if (processor === undefined)
    {
        throw new Error('Processor has not been set. Call setupProcessor() first.');
    }

    return processor;
}
