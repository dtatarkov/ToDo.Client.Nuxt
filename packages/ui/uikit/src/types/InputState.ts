import type { InputType } from '../enums/inputType';
import type { InputData } from './inputData';

export type InputState<V = any, TData extends InputData<V> = InputData<V>> = TData & {
    inputType: InputType;
    value: V;
    name: string;
    isDisabled: boolean;
    hasAutofocus: boolean;
    hasError: boolean;
};
