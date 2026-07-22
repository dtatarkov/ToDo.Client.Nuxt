import { Viewmodel } from './viewmodel';
import type { InputElementData } from '../types/inputElementData';

export type InputBaseViewmodelState<TData extends InputElementData<V>, V> = TData & {
    name: string;
    value: V;
};

export abstract class InputBaseViewmodel<V, TData extends InputElementData<V>, TState extends InputBaseViewmodelState<TData, V>> extends Viewmodel<TState>
{
    abstract readonly name: string;
    abstract value: V;

    abstract setData(data: TData): void;
}
