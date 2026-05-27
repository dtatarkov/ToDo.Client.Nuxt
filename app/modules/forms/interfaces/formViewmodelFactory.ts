import type { FormSubmitHandler } from './formSubmitHandler';
import type { Form } from '../entities/form';

export abstract class FormViewmodelFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(submitHandler: FormSubmitHandler<TEntity>): Form<TEntity>;
}