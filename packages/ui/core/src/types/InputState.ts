import type { InputData } from './inputData';

export type InputState<V = any, TData extends InputData<V> = InputData<V>> = TData & {
    name: string;
    value: V;
};
