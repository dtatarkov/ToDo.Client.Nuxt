import type { ObservableWritable } from './observableWritable';

export interface ObservableArray<T> extends ObservableWritable<T[]>
{
    add(element: T): void;
    remove(element: T): boolean;
}