import { InputViewmodel } from './inputViewmodel';
import type { InputData } from '../types/inputData';
import type { InputState } from '../types/InputState';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { EntitySchemeConfigurator, EntitySchemeFieldConfigurators } from '@client/infrastructure-entity-schemes';

export abstract class InputViewmodelImpl<V, TData extends InputData<V>, TState extends InputState<V, TData>> extends ViewmodelBase<TState> implements InputViewmodel<V, TData, TState>
{
    private baseScheme = EntityScheme.create(scheme => ({
        id: scheme.string(),
        name: scheme.string().withDefault(''),
        isDisabled: scheme.boolean().withDefault(false),
        hasAutofocus: scheme.boolean().withDefault(false),
        hasError: scheme.boolean().withDefault(false),
    }));

    protected withBaseScheme<T extends EntitySchemeFieldConfigurators<any, any>>(
        setup: (configurator: EntitySchemeConfigurator) => T
    )
    {
        return this.baseScheme.extend(setup);
    }

    private readonly scheme = this.createScheme();

    state = new ObservableViewmodelStateBase(this.getInitialData(), this.scheme);

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

    protected abstract getInitialData(): TData;
    protected abstract getDefaultValue(): V;
    protected abstract createScheme(): EntityScheme<TData, TState>;
}
