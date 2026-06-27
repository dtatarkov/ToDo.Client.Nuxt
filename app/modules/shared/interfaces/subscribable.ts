import type { Action } from '../types/action';
import type { DisposeToken } from '../entities/disposeToken';

export interface Subscribable<T> extends Disposable
{
    on(handler: Action<[T]>, disposeToken?: DisposeToken): void;
}