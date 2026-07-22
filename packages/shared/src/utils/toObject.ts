import type { Func } from '../types/func';

/**
 * Converts an array to a record object using specified key and value mappings.
 * 
 * @template T - The type of elements in the input array.
 * @template K - The type of keys in the resulting record.
 * @template V - The type of values in the resulting record.
 * @param {T[]} array - The input array to convert.
 * @param {Func<K, [T]>} key - A function that takes an array element and returns the key.
 * @param {Func<V, [T]>} value - A function that takes an array element and returns the value.
 * @returns {Record<K, V>} A record object with keys and values derived from the array elements.
 * 
 * @example
 * ```ts
 * const users = [
 *   { id: 1, name: 'Alice', age: 30 },
 *   { id: 2, name: 'Bob', age: 25 }
 * ];
 * 
 * const userMap = toObject(users, user => user.id, user => user.name);
 * // Result: { '1': 'Alice', '2': 'Bob' }
 * ```
 */
export function toObject<T, K extends string | number | symbol, V = T>(
    array: T[],
    key: Func<K, [T]>,
    value?: Func<V, [T]>
): Record<K, V>
{
    const result = {} as Record<K, V>;

    for (const item of array)
    {
        const itemKey = key(item);
        const itemValue = value?.(item) ?? (item as unknown as V);
        result[itemKey] = itemValue;
    }

    return result;
}
