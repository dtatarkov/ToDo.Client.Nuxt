import type { InputType } from '../enums/inputType';
import type { InputData } from './inputData';

export type InputStateDefault<V> = {
    name: string;
    value: V;
    isDisabled: boolean;
    hasAutofocus: boolean;
    hasError: boolean;
};

export type InputStateInitial<TState, V> = Omit<TState, keyof InputStateDefault<V>>;

export type InputState<V = any, TData extends InputData<V> = InputData<V>> = TData & {
    type: InputType;
    name: string;
    value: V;
    isDisabled: boolean;
    hasAutofocus: boolean;
    hasError: boolean;
};
