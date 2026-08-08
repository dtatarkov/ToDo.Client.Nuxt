import type { InputData } from './inputData';

export type InputStateBase = {
    name: string;
    isDisabled: boolean;
    hasAutofocus: boolean;
    hasError: boolean;
};

export type InputStateDefault<V> = InputStateBase & {
    value: V;
};

export type InputStateInitial<TState, V> = Omit<TState, keyof InputStateDefault<V>>;

export type InputState<V = any, TData extends InputData<V> = InputData<V>> = TData & InputStateBase & {
    value: V;
};
