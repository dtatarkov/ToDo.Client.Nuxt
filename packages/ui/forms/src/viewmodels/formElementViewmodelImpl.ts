import { FormElementViewmodel } from './formElementViewmodel';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import type { InputType, InputViewmodel } from '@client/ui-uikit';
import { messageKeyValues } from '@client/infrastructure-messages';
import { EntityData } from '@client/infrastructure-entity-schemes';
import type { FormElementValue } from '../types/formElementValue';
import type { FormElementDataChanges } from '../types/formElementDataChanges';
import type { FormElementDataForType } from '../types/formElementDataForType';

export class FormElementViewmodelImpl<TType extends InputType> extends ViewmodelBase<FormElementDataForType<TType>> implements FormElementViewmodel<TType>
{
    private data = EntityData.create({}, scheme =>
    ({
        labelKey: scheme.enum(messageKeyValues),
        errorKey: scheme.enum(messageKeyValues),
    }));


    state: ObservableViewmodelStateBase<FormElementDataForType<TType>, FormElementDataForType<TType>>;

    constructor(
        private inputViewmodel: InputViewmodel<FormElementValue<TType>, any>,
        private fieldScheme?: any,
    )
    {
        super();

        this.state = new ObservableViewmodelStateBase<FormElementDataForType<TType>, FormElementDataForType<TType>>({
            inputType: this.inputViewmodel.inputType,
            ...this.data.value,
            ...inputViewmodel.state.value,
        });

        this.disposeToken.registerDisposable(inputViewmodel);
    }

    get name(): string
    {
        return this.inputViewmodel.name;
    }

    get value(): FormElementValue<TType>
    {
        return this.inputViewmodel.value;
    }

    set value(value: FormElementValue<TType>)
    {
        this.inputViewmodel.value = value;
        this.updateStateFromInput();
    }

    disable(): void
    {
        this.inputViewmodel.disable();
        this.updateStateFromInput();
    }

    enable(): void
    {
        this.inputViewmodel.enable();
        this.updateStateFromInput();
    }

    setDefaultValue(): void
    {
        this.inputViewmodel.setDefaultValue();
        this.updateStateFromInput();
    }

    setData(data: FormElementDataChanges): void
    {
        this.data.update(data);
        this.updateStateFromData();

        this.inputViewmodel.setData(data);
        this.updateStateFromInput();
    }

    validate(): void
    {
        if (!this.fieldScheme)
        {
            return;
        }

        const errors = this.fieldScheme.validate(this.inputViewmodel.value);

        if (errors.length > 0)
        {
            this.inputViewmodel.toErrorMode();
            this.data.update({ errorKey: errors[0]?.messageKey });
        }
        else
        {
            this.inputViewmodel.toDefaultMode();
            this.data.update({ errorKey: undefined });
        }

        this.updateStateFromData();
        this.updateStateFromInput();
    }

    private updateStateFromInput()
    {
        this.state.update({ ...this.inputViewmodel.state.value });
    }

    private updateStateFromData()
    {
        this.state.update({ ...this.data.value } as FormElementDataForType<TType>);
    }
}
