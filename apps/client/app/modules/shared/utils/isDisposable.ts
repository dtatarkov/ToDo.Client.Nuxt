/**
 * Checks if an object implements the Disposable interface (has [Symbol.dispose] method).
 * @param obj - The object to check
 * @returns True if the object is Disposable
 */
export function isDisposable(obj: unknown): obj is Disposable
{
    return obj !== null
        && obj !== undefined
        && typeof obj === 'object'
        && typeof (obj as any)[Symbol.dispose] === 'function';
}