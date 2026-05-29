import { FormElementFactory } from './formElementFactory';
import type { Form } from "../entities/form";
import { dependency } from "@/modules/shared/decorators/dependency";
import type { FormFactory } from './formFactory';
import { FormBase } from '../entities/formBase';

@dependency(FormElementFactory)
export class FormFactoryImpl implements FormFactory
{
  constructor(protected formElementFactory: FormElementFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(): Form<TEntity>
  {
    return new FormBase(this.formElementFactory);
  }
}