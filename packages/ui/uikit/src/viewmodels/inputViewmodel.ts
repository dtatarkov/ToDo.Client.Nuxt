import { Viewmodel } from '@client/ui-core';
import type { InputData } from '../types/inputData';
import type { InputType } from '../enums/inputType';

export abstract class InputViewmodel<V, TData extends InputData<V> = InputData<V>> extends Viewmodel<TData>
{
    abstract readonly inputType: InputType;
    abstract readonly name: string;
    abstract readonly isDisabled: boolean;
    abstract readonly hasError: boolean;

    abstract value: V;

    abstract setData(data: Partial<TData>): void;
    abstract disable(): void;
    abstract enable(): void;
    abstract setDefaultValue(): void;
    abstract toErrorMode(): void;
    abstract toDefaultMode(): void;
}