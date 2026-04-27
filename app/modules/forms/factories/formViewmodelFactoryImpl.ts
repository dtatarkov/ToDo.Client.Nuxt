import { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
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

  create<TEntity extends Record<string, any> = Record<string, any>>(): FormViewmodel<TEntity>
  {
    return new FormViewmodelBase(this.formElementFactory);
  }
}