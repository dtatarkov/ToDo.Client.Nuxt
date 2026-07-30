import type { ObservableViewmodelState } from '@client/ui-core';
import type { FormViewmodelState } from '../types/formViewmodelState';
import { FormDataContext } from './formDataContext';
import type { FormElement } from './formElement';


export class FormDataContextBase<TEntity extends Record<string, any>> extends FormDataContext<TEntity>
{
    constructor(
        private elements: FormElement[],
        private state: ObservableViewmodelState<FormViewmodelState<TEntity>>
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

        const newData = this.getData();
        this.state.update({ data: newData });
    }
}
