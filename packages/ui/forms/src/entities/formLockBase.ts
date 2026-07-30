import type { ObservableViewmodelState } from '@client/ui-core';
import { FormDisabledException } from '../exceptions/formDisabledException';
import type { FormViewmodelState } from '../types/formViewmodelState';
import type { FormElement } from './formElement';
import { FormLock } from './formLock';


export class FormLockBase<TEntity extends Record<string, any>> extends FormLock
{
    constructor(
        private elements: FormElement[],
        private state: ObservableViewmodelState<FormViewmodelState<TEntity>>
    )
    {
        super();
    }

    override isDisabled(): boolean
    {
        return this.state.value.isDisabled;
    }

    override enable(): void
    {
        if (!this.isDisabled())
        {
            return;
        }

        this.elements.forEach(element => element.enable());
        this.state.update({ isDisabled: false });
    }

    override disable(): void
    {
        this.assertNotDisabled();

        this.elements.forEach(element => element.disable());
        this.state.update({ isDisabled: true });
    }

    override assertNotDisabled(): void
    {
        if (this.isDisabled())
        {
            throw new FormDisabledException();
        }
    }
}
