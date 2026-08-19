import type { InputData } from '../types/inputData';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { EntitySchemeConfigurator, EntitySchemeFieldConfigurators } from '@client/infrastructure-entity-schemes';
import { type InputType } from '../enums/inputType';
import type { InputViewmodel } from './inputViewmodel';

export abstract class InputViewmodelImpl<V, TData extends InputData<V>> extends ViewmodelBase<TData> implements InputViewmodel<V, TData>
{
    private baseScheme = EntityScheme.create(scheme => ({
        id: scheme.string().withDefault(''),
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

    state = new ObservableViewmodelStateBase<Partial<TData>, TData>({
        ...this.getInitialData()
    }, this.scheme);

    get inputType(): InputType
    {
        return this.getType();
    }

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
        this.state.update({ value } as Partial<TData>);
    }

    get isDisabled(): boolean
    {
        return this.state.value.isDisabled ?? false;
    }

    get hasError(): boolean
    {
        return this.state.value.hasError ?? false;
    }

    setData(data: Partial<TData>): void
    {
        this.state.update(data as Partial<TData>);
    }

    disable(): void
    {
        this.state.update({ isDisabled: true } as Partial<TData>);
    }

    enable(): void
    {
        this.state.update({ isDisabled: false } as Partial<TData>);
    }

    setDefaultValue(): void
    {
        this.value = this.getDefaultValue();
    }

    toErrorMode(): void
    {
        this.state.update({ hasError: true } as Partial<TData>);
    }

    toDefaultMode(): void
    {
        this.state.update({ hasError: false } as Partial<TData>);
    }

    protected getInitialData(): Partial<TData>
    {
        return {};
    }

    protected abstract getType(): InputType;
    protected abstract getDefaultValue(): V;
    protected abstract createScheme(): EntityScheme<TData, TData>;
}