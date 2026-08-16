import { FormElementViewmodel } from './formElementViewmodel';
import type { FormElementValidationError } from '../entities/formElementValidationError';
import { ObservableViewmodelStateBase, ViewmodelBase } from '@client/ui-core';
import type { InputType, InputViewmodel } from '@client/ui-uikit';
import { messageKeyValues } from '@client/infrastructure-messages';
import { EntityData } from '@client/infrastructure-entity-schemes';
import type { FormElementStateForType } from '../types/formElementStateForType';
import type { FormElementValue } from '../types/formElementValue';
import type { FormElementDataForType } from '../types/formElementDataForType';
import type { FormElementData } from '../types/formElementData';

export class FormElementViewmodelImpl<TType extends InputType> extends ViewmodelBase<FormElementStateForType<TType>> implements FormElementViewmodel<TType>
{
    private data = EntityData.create({}, scheme =>
    ({
        labelKey: scheme.enum(messageKeyValues),
        errorKey: scheme.enum(messageKeyValues),
    }));

    state: ObservableViewmodelStateBase<FormElementData, FormElementStateForType<TType>>;

    constructor(
        private inputViewmodel: InputViewmodel<FormElementValue<TType>, any>
    )
    {
        super();

        this.state = new ObservableViewmodelStateBase({
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

    setData(data: FormElementDataForType<TType>): void
    {
        this.data.update(data);
        this.updateStateFromData();

        this.inputViewmodel.setData(data);
        this.updateStateFromInput();
    }

    validate(): void
    {
        // Validation logic is handled by FormValidator at the form layer.
        // This method is present for API compatibility but does nothing.
    }

    isValid(): boolean
    {
        return true;
    }

    getError(): FormElementValidationError | undefined
    {
        return undefined;
    }

    private updateStateFromInput()
    {
        this.state.update({ ...this.inputViewmodel.state.value });
    }

    private updateStateFromData()
    {
        this.state.update({ ...this.data.value });
    }
}
