import { InputViewmodel } from './inputViewmodel';
import type { InputData } from '../types/inputData';
import type { InputState, InputStateDefault, InputStateInitial } from '../types/InputState';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';

export abstract class InputViewmodelImpl<V, TData extends InputData<V>, TState extends InputState<V, TData>> extends ViewmodelBase<TState> implements InputViewmodel<V, TData, TState>
{
    state = new ObservableViewmodelStateBase<TState>(this.getInitialStateFull());

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
        this.state.update({ value } as Partial<TState>);
    }

    get isDisabled(): boolean
    {
        return this.state.value.isDisabled ?? false;
    }

    get hasError(): boolean
    {
        return this.state.value.hasError ?? false;
    }

    setData(data: TData): void
    {
        this.state.update({ ...data } as unknown as Partial<TState>);
    }

    disable(): void
    {
        this.state.update({ isDisabled: true } as Partial<TState>);
    }

    enable(): void
    {
        this.state.update({ isDisabled: false } as Partial<TState>);
    }

    setDefaultValue(): void
    {
        this.value = this.getDefaultValue();
    }

    toErrorMode(): void
    {
        this.state.update({ hasError: true } as Partial<TState>);
    }

    toDefaultMode(): void
    {
        this.state.update({ hasError: false } as Partial<TState>);
    }

    protected getDefaultState(): InputStateDefault<V>
    {
        return {
            name: '',
            value: this.getDefaultValue(),
            isDisabled: false,
            hasAutofocus: false,
            hasError: false,
        };
    }

    protected getInitialStateFull(): TState
    {
        return {
            ...this.getDefaultState(),
            ...this.getInitialState(),
        } as TState;
    }

    protected abstract getInitialState(): InputStateInitial<TState, V>;
    protected abstract getDefaultValue(): V;
}
