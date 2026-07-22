import { ObservableWritableBase } from '@client/shared';
import { InputBaseViewmodel, type InputBaseViewmodelState } from './inputBaseViewmodel';
import { ViewmodelBase } from './viewmodelBase';
import type { InputElementData } from '../types/inputElementData';

export abstract class InputBaseViewmodelImpl<V, TData extends InputElementData<V>, TState extends InputBaseViewmodelState<TData, V>> extends ViewmodelBase<TState> implements InputBaseViewmodel<V, TData, TState>
{
    state = new ObservableWritableBase<TState>(this.getInitialState());

    get name(): string
    {
        return this.state.value.name ?? '';
    }

    get value(): V
    {
        return this.state.value.value;
    }

    set value(value: V)
    {
        this.updateState({ value } as Partial<TState>);
    }

    setData(data: TData): void
    {
        this.updateState({ ...(data as unknown as TState) });
    }

    protected abstract getInitialState(): TState;
}
