import type { Action } from '../types/action';
import { delay } from './delay';

export interface PromiseResolver<T>
{
    resolve: Action<[T]>;
    promise: Promise<T>;
}

export async function getPromiseResolverAsync<T = void>(): Promise<PromiseResolver<T>>
{
    let resolve!: Action<[T]>;

    const promise = new Promise<T>(res =>
    {
        resolve = res;
    });

    await delay(0);

    return { resolve: resolve!, promise };
}
