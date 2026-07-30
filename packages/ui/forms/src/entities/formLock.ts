import type { FormElement } from './formElement';
import { FormDisabledException } from '../exceptions/formDisabledException';
import { ObservableViewmodelState } from '@client/ui-core';
import type { FormViewmodelState } from '../types/formViewmodelState';

export interface IFormLock
{
    isDisabled(): boolean;
    enable(): void;
    disable(): void;
    assertNotDisabled(): void;
}

export class FormLock<TEntity extends Record<string, any>> implements IFormLock
{
    constructor(
        private elements: FormElement[],
        private state: ObservableViewmodelState<FormViewmodelState<TEntity>>
    ) { }

    isDisabled(): boolean
    {
        return this.state.value.isDisabled;
    }

    enable(): void
    {
        if (!this.isDisabled())
        {
            return;
        }

        this.elements.forEach(element => element.enable());
        this.state.update({ isDisabled: false });
    }

    disable(): void
    {
        this.assertNotDisabled();

        this.elements.forEach(element => element.disable());
        this.state.update({ isDisabled: true });
    }

    assertNotDisabled(): void
    {
        if (this.isDisabled())
        {
            throw new FormDisabledException();
        }
    }
}
