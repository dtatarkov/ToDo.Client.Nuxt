import { FormElementFactory } from './formElementFactory';
import type { Form, FormConfiguration } from "../entities/form";
import { dependency } from "@/modules/shared/decorators/dependency";
import type { FormFactory } from './formFactory';
import { FormBase } from '../entities/formBase';
import { EntitySchemeToFormElementsMapper } from '../mappers/entitySchemeToFormElementsMapper';

@dependency(FormElementFactory)
@dependency(EntitySchemeToFormElementsMapper)
export class FormFactoryImpl implements FormFactory
{
  constructor(
    private formElementFactory: FormElementFactory,
    private schemeToElementsMapper: EntitySchemeToFormElementsMapper,
  )
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(configuration: FormConfiguration<TEntity>): Form<TEntity>
  {
    return new FormBase(this.formElementFactory, this.schemeToElementsMapper, configuration);
  }
}