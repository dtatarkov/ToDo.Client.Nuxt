import { FormElementViewmodelFactory } from '../interfaces/formElementViewmodelFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import type { Form } from "../entities/form";
import type { FormViewmodelFactory } from '../interfaces/formViewmodelFactory';
import { dependency } from "@/modules/shared/decorators/dependency";
import { FormBase } from '../entities/formBase';

@dependency(FormElementViewmodelFactory)
export class FormViewmodelFactoryImpl implements FormViewmodelFactory
{
  constructor(protected formElementFactory: FormElementViewmodelFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(submitHandler: FormSubmitHandler): Form<TEntity>
  {
    return new FormBase(this.formElementFactory, submitHandler);
  }
}