/**
 * Checks if a value is a plain object (not an array, not null, constructor is Object).
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 */
export function isObject(value: unknown): value is Record<string, unknown>
{
    return value !== null
        && typeof value === 'object'
        && !Array.isArray(value)
        && value.constructor === Object;
}