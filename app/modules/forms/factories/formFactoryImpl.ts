import type { Form, FormConfiguration } from "../entities/form";
import { dependency } from "@/modules/shared/decorators/dependency";
import type { FormFactory } from './formFactory';
import { FormBase } from '../entities/formBase';
import { FormElementsFactory } from './formElementsFactory';

@dependency(FormElementsFactory)
export class FormFactoryImpl implements FormFactory
{
  constructor(
    private formElementsFactory: FormElementsFactory,
  )
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(configuration: FormConfiguration<TEntity>): Form<TEntity>
  {
    return new FormBase(this.formElementsFactory, configuration);
  }
}