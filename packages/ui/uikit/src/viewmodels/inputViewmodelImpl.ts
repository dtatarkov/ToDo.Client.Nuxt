import type { InputData } from '../types/inputData';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import { EntityScheme } from '@client/infrastructure-entity-schemes';
import type { EntitySchemeConfigurator, EntitySchemeFieldConfigurators } from '@client/infrastructure-entity-schemes';
import { inputTypeValues, type InputType } from '../enums/inputType';
import type { InputState } from '../types/inputState';
import type { InputViewmodel } from './inputViewmodel';

export abstract class InputViewmodelImpl<V, TData extends InputData<V>> extends ViewmodelBase<InputState<V, TData>> implements InputViewmodel<V, TData>
{
    private baseScheme = EntityScheme.create(scheme => ({
        id: scheme.string(),
        inputType: scheme.enum(inputTypeValues).required(),
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

    state = new ObservableViewmodelStateBase({
        inputType: this.getType(),

        ...this.getInitialData()
    }, this.scheme);

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
        this.state.update({ value } as Partial<InputState<V, TData>>);
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
        this.state.update({ ...data } as unknown as Partial<InputState<V, TData>>);
    }

    disable(): void
    {
        this.state.update({ isDisabled: true } as Partial<InputState<V, TData>>);
    }

    enable(): void
    {
        this.state.update({ isDisabled: false } as Partial<InputState<V, TData>>);
    }

    setDefaultValue(): void
    {
        this.value = this.getDefaultValue();
    }

    toErrorMode(): void
    {
        this.state.update({ hasError: true } as Partial<InputState<V, TData>>);
    }

    toDefaultMode(): void
    {
        this.state.update({ hasError: false } as Partial<InputState<V, TData>>);
    }

    protected abstract getType(): InputType;
    protected abstract getInitialData(): TData;
    protected abstract getDefaultValue(): V;
    protected abstract createScheme(): EntityScheme<TData, InputState<V, TData>>;
}
