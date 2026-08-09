import type { InputData } from './inputData';

export type InputState<V = any, TData extends InputData<V> = InputData<V>> = TData & {
    value: V;
    name: string;
    isDisabled: boolean;
    hasAutofocus: boolean;
    hasError: boolean;
};
