import { FormElementFactory } from './formElementFactory';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';
import type { Form } from "../entities/form";
import { dependency } from "@/modules/shared/decorators/dependency";
import { FormBase } from '../entities/formBase';
import type { FormFactory } from './formFactory';

@dependency(FormElementFactory)
export class FormFactoryImpl implements FormFactory
{
  constructor(protected formElementFactory: FormElementFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(submitHandler: FormSubmitHandler): Form<TEntity>
  {
    return new FormBase(this.formElementFactory, submitHandler);
  }
}