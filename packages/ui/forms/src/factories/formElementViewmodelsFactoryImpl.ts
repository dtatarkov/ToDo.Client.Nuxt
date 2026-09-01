import { dependency } from '@client/infrastructure-di';
import { FormElementViewmodelsFactory } from './formElementViewmodelsFactory';
import { FormElementViewmodelImpl } from '../viewmodels/formElementViewmodelImpl';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';
import { UIKitViewmodelsFactory } from '@client/ui-uikit';
import type { EntityScheme } from '@client/infrastructure-entity-schemes';
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

    override createViewmodels<TEntity extends Record<string, any>>(
        elementsCreateData: Record<keyof TEntity, FormElementCreateData>,
        scheme?: EntityScheme<any, TEntity>,
    ): FormElementViewmodel[]
    {
        const result = new Array<FormElementViewmodel>();

        for (const [name, createData] of Object.entries(elementsCreateData))
        {
            const inputViewmodel = this.uikitFactory.createInput(createData.inputType);
            const fieldScheme = scheme?.fields[name as keyof TEntity];
            const formElementViewmodel = new FormElementViewmodelImpl(inputViewmodel, fieldScheme);

            formElementViewmodel.setData({
                name,
                ...createData
            });

            result.push(formElementViewmodel);
        }

        return result;
    }
}
