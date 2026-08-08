import { InputViewmodel } from './inputViewmodel';
import type { InputData } from '../types/inputData';
import type { InputState, InputStateBase, InputStateDefault, InputStateInitial } from '../types/InputState';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { EntitySchemeConfigurator, EntityFieldSchemeConfigurator } from '@client/infrastructure-entity-schemes';

export abstract class InputViewmodelImpl<V, TData extends InputData<V>, TState extends InputState<V, TData>> extends ViewmodelBase<TState> implements InputViewmodel<V, TData, TState>
{
    private baseScheme = EntityScheme.create((c) => ({
        id: c.string(),
        name: c.string().required(),
        isDisabled: c.boolean().required(),
        hasAutofocus: c.boolean().required(),
        hasError: c.boolean().required(),
    }));

    protected withBaseScheme<TNew extends Record<string, any>>(
        setup: (configurator: EntitySchemeConfigurator) => { [K in keyof TNew]: EntityFieldSchemeConfigurator<TNew[K]> }
    ): EntityScheme<InputStateBase & TNew>
    {
        return this.baseScheme.extend(setup) as EntityScheme<InputStateBase & TNew>;
    }

    private readonly scheme: EntityScheme<InputStateBase> = this.createScheme();

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
    protected abstract createScheme(): EntityScheme<TState>;
}
