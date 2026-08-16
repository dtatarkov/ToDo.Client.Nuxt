import type { Func } from '../types/func';

export function filterObject<T extends Record<string, any>>(
    obj: T,
    predicate: Func<boolean, [key: keyof T, value: T[keyof T]]>
): Partial<T>
{
    const result = Object.entries(obj).reduce((result, [key, value]) =>
    {
        if (predicate(key as keyof T, value))
        {
            result[key as keyof T] = value;
        }
        return result;
    }, {} as Partial<T>);

    return result;
}
