import { compactObject } from './compactObject';

export function withDefaults<A extends object, B extends object>(object: A, defaults: B): A & B
{
    const compactedObject = compactObject({ ...object });
    const result = { ...defaults, compactedObject } as unknown as A & B;

    return result;
}
