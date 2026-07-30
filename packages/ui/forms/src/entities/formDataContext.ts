import type { FormElement } from './formElement';
import { ObservableViewmodelState } from '@client/ui-core';
import type { FormViewmodelState } from '../types/formViewmodelState';

export interface IFormDataContext<TEntity extends Record<string, any>>
{
    getData(): Record<keyof TEntity, any>;
    setData(changeData: Partial<Record<keyof TEntity, any>>): void;
}

export class FormDataContext<TEntity extends Record<string, any>> implements IFormDataContext<TEntity>
{
    constructor(
        private elements: FormElement[],
        private state: ObservableViewmodelState<FormViewmodelState<TEntity>>
    ) { }

    getData(): Record<keyof TEntity, any>
    {
        const data: Record<string, any> = {};

        for (const element of this.elements)
        {
            data[element.name] = element.value;
        }

        return data as Record<keyof TEntity, any>;
    }

    setData(changeData: Partial<Record<keyof TEntity, any>>): void
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
