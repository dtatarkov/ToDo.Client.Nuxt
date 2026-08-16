import { dependency } from '@client/infrastructure-di';
import { FormElementViewmodelsFactory } from './formElementViewmodelsFactory';
import { FormElementViewmodelImpl } from '../viewmodels/formElementViewmodelImpl';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';
import { UIKitViewmodelsFactory } from '@client/ui-uikit';
import type { FormElementCreateData } from '../types/formElementCreateData';

@dependency(UIKitViewmodelsFactory)
export class FormElementViewmodelsFactoryImpl extends FormElementViewmodelsFactory
{
    constructor(
        private readonly uikitFactory: UIKitViewmodelsFactory,
    )
    {
        super();
    }

    override createViewmodels(
        elementsCreateData: Record<string, FormElementCreateData>,
    ): FormElementViewmodel[]
    {
        const result = new Array<FormElementViewmodel>();

        for (const [name, createData] of Object.entries(elementsCreateData))
        {
            const inputViewmodel = this.uikitFactory.createInput(createData.inputType);
            const formElementViewmodel = new FormElementViewmodelImpl(inputViewmodel);

            formElementViewmodel.setData({ name, ...createData });

            result.push(formElementViewmodel);
        }

        return result;
    }
}
