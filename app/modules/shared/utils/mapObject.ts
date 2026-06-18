export function mapObject<TInput extends Record<string, any>, TOutput>(
    obj: TInput,
    mapFn: (value: TInput[keyof TInput], key: keyof TInput) => TOutput | undefined,
    omitUndefined: boolean = true
): Record<keyof TInput, TOutput>
{
    const result = {} as Record<keyof TInput, TOutput>;

    for (const key of Object.keys(obj) as Array<keyof TInput>)
    {
        const mapped = mapFn(obj[key], key);

        if (omitUndefined && mapped === undefined)
        {
            continue;
        }

        result[key] = mapped as TOutput;
    }

    return result;
}