import { isObservable } from '../entities/observableReadonly';
import type { ObservableReadonly } from '../entities/observableReadonly';

export abstract class Emptyable
{
    abstract isEmpty: ObservableReadonly<boolean>;
}

export function isEmptyable(value: unknown): value is Emptyable
{
    return typeof value === 'object'
        && value !== null
        && 'isEmpty' in value
        && isObservable(value.isEmpty)
        && typeof value.isEmpty.value === 'boolean';
}