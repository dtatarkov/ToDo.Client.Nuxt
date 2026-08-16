import type { FormViewmodelFactory } from './formViewmodelFactory';
import { FormViewmodelImpl } from '../viewmodels/formViewmodelImpl';
import { FormElementViewmodelsFactory } from './formElementViewmodelsFactory';
import { dependency } from '@client/infrastructure-di';
import type { FormConfiguration } from '../configuration/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';
import type { FormViewmodel } from '../viewmodels/formViewmodel';

@dependency(FormElementViewmodelsFactory)
export class FormViewmodelFactoryImpl implements FormViewmodelFactory
{
  constructor(
    private formElementViewmodelsFactory: FormElementViewmodelsFactory,
  )
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(
    configuration: FormConfiguration<TEntity>,
    handlers: FormHandlers<TEntity>
  ): FormViewmodel<TEntity>
  {
    const formElementViewmodels = this.formElementViewmodelsFactory.createViewmodels(
      configuration.elements,
    );

    return new FormViewmodelImpl(formElementViewmodels, handlers);
  }
}