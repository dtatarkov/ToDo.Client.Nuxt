import type { Form } from '../entities/form';
import type { FormSubmitHandler } from '../interfaces/formSubmitHandler';

export abstract class FormFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(submitHandler: FormSubmitHandler<TEntity>): Form<TEntity>;
}