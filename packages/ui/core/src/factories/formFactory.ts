import type { Form } from '../entities/form';
import type { FormConfiguration } from '../types/formConfiguration';
import type { FormHandlers } from '../types/formHandlers';

export abstract class FormFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(
    configuration: FormConfiguration<TEntity>,
    handlers: FormHandlers<TEntity>
  ): Form<TEntity>;
}