import type { ValueOrGetter } from '../types/valueOrGetter';

export abstract class ReactiveField<T>
{
    abstract get value(): T;
    abstract set value(value: ValueOrGetter<T>);
}