import type { Subscribable } from '../interfaces/subscribable';

export type ObservableWritableConfiguration = {
    deferred?: boolean;
    skipEmitOnSameValue?: boolean;
};

export interface ObservableWritable<T> extends Subscribable<T>
{
    value: T;
}