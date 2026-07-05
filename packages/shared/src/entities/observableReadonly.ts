import type { Subscribable } from '../interfaces/subscribable';

export interface ObservableReadonly<T> extends Subscribable<T>
{
    readonly value: T;
}

export function isObservable(value: unknown): value is ObservableReadonly<any>
{
    return typeof value === 'object'
        && value !== null
        && 'value' in value
        && 'on' in value
        && typeof value.on === 'function';
}