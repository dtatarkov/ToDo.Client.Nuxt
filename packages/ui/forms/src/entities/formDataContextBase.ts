import type { ObservableViewmodelState } from '@client/ui-core';
import { FormDataContext } from './formDataContext';
import type { FormElementViewmodel } from '../viewmodels/formElementViewmodel';
import type { FormState } from '../types/formState';


export class FormDataContextBase<TEntity extends Record<string, any>> extends FormDataContext<TEntity>
{
    constructor(
        private elements: FormElementViewmodel[],
        private state: ObservableViewmodelState<FormState>
    )
    {
        super();
    }

    override getData(): Record<keyof TEntity, any>
    {
        const data: Record<string, any> = {};

        for (const element of this.elements)
        {
            data[element.name] = element.value;
        }

        return data as Record<keyof TEntity, any>;
    }

    override setData(changeData: Partial<Record<keyof TEntity, any>>): void
    {
        for (const element of this.elements)
        {
            if (element.name in changeData)
            {
                element.value = changeData[element.name];
            }

            else
            {
                element.setDefaultValue();
            }
        }

        this.state.update({
            elements: this.elements.map(x => x.state.value)
        });
    }
}
