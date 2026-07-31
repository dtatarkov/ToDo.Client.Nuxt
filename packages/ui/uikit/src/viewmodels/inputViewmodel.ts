import { Viewmodel } from '@client/ui-core';
import type { InputData } from '../types/inputData';
import type { InputState } from '../types/InputState';

export abstract class InputViewmodel<V, TData extends InputData<V> = InputData<V>, TState extends InputState<V, TData> = InputState<V, TData>> extends Viewmodel<TState>
{
    abstract readonly name: string;
    abstract value: V;

    abstract setData(data: TData): void;
}
