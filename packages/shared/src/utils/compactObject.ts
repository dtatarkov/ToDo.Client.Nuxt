import { filterObject } from './filterObject';

export function compactObject<T extends Record<string, any>>(obj: T): Partial<T>
{
    const result = filterObject(obj, (_key, value) => value !== null && value !== undefined);

    return result;
}
