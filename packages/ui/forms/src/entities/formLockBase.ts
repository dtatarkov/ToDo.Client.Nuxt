import type { ObservableViewmodelState } from '@client/ui-core';
import { FormDisabledException } from '../exceptions/formDisabledException';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';
import { FormLock } from './formLock';
import type { FormDataFull } from '../types/formDataFull';


export class FormLockBase extends FormLock
{
    constructor(
        private elements: FormElementViewmodel[],
        private state: ObservableViewmodelState<FormDataFull>
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
