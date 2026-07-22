import type { FormFactory } from './formFactory';
import { FormViewmodelImpl } from '../viewmodels/formViewmodelImpl';
import { FormElementsFactory } from './formElementsFactory';
import { dependency } from '@client/infrastructure-di';
import type { FormConfiguration } from '../types/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';
import type { FormViewmodel } from '../viewmodels/formViewmodel';

@dependency(FormElementsFactory)
export class FormFactoryImpl implements FormFactory
{
  constructor(
    private formElementsFactory: FormElementsFactory,
  )
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(
    configuration: FormConfiguration<TEntity>,
    handlers: FormHandlers<TEntity>
  ): FormViewmodel<TEntity>
  {
    return new FormViewmodelImpl(this.formElementsFactory, configuration, handlers);
  }
}