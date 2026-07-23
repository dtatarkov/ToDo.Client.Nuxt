import { ObservableWritableBase } from '@client/shared';
import { InputViewmodel } from './inputViewmodel';
import { ViewmodelBase } from './viewmodelBase';
import type { InputData } from '../types/inputData';
import type { InputState } from '../types/InputState';

export abstract class InputViewmodelImpl<V, TData extends InputData<V>, TState extends InputState<V, TData>> extends ViewmodelBase<TState> implements InputViewmodel<V, TData, TState>
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
