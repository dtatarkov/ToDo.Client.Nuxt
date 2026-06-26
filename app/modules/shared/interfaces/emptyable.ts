import type { Action } from '../types/action';
import type { DisposeToken } from '../entities/disposeToken';

export abstract class Emptyable
{
    abstract readonly isEmpty: boolean;

    abstract onEmptyStateChange(handler: Action<[isEmpty: boolean]>, disposeToken?: DisposeToken): void;
}

export function isEmptyable(value: unknown): value is Emptyable
{
    return typeof value === 'object'
        && value !== null
        && 'isEmpty' in value
        && typeof (value as Emptyable).isEmpty === 'boolean'
        && 'onEmptyStateChange' in value
        && typeof (value as Emptyable).onEmptyStateChange === 'function';
}