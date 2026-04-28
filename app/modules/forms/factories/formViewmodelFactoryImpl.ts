import { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import { FormViewmodel } from "../interfaces/formViewmodel";
import { FormViewmodelFactory } from '../interfaces/formViewmodelFactory';
import { FormViewmodelBase } from "../viewmodels/formViewmodelBase";
import { dependency } from "@/modules/shared/decorators/dependency";

@dependency(FormElementViewmodelFactory)
export class FormViewmodelFactoryImpl implements FormViewmodelFactory
{
  constructor(protected formElementFactory: FormElementViewmodelFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(submitHandler: FormSubmitHandler): FormViewmodel<TEntity>
  {
    return new FormViewmodelBase(this.formElementFactory, submitHandler);
  }
}