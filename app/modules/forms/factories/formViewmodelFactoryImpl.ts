import { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import type { FormViewmodel } from "../interfaces/formViewmodel";
import type { FormViewmodelFactory } from '../interfaces/formViewmodelFactory';
import { FormViewmodelImpl } from "../viewmodels/formViewmodelImpl";
import { dependency } from "@/modules/shared/decorators/dependency";

@dependency(FormElementViewmodelFactory)
export class FormViewmodelFactoryImpl implements FormViewmodelFactory
{
  constructor(protected formElementFactory: FormElementViewmodelFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(submitHandler: FormSubmitHandler): FormViewmodel<TEntity>
  {
    return new FormViewmodelImpl(this.formElementFactory, submitHandler);
  }
}