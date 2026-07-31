import { Viewmodel } from '@client/ui-core';
import type { InputData } from '../types/inputData';
import type { InputState } from '../types/InputState';

export abstract class InputViewmodel<V, TData extends InputData<V> = InputData<V>, TState extends InputState<V, TData> = InputState<V, TData>> extends Viewmodel<TState>
{
    abstract readonly name: string;
    abstract readonly isDisabled: boolean;
    abstract readonly hasError: boolean;

    abstract value: V;

    abstract setData(data: TData): void;
    abstract disable(): void;
    abstract enable(): void;
    abstract setDefaultValue(): void;
    abstract toErrorMode(): void;
    abstract toDefaultMode(): void;
}
