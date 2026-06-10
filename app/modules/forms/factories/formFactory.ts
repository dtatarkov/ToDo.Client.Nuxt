import type { Form, FormConfiguration } from '../entities/form';

export abstract class FormFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(configuration?: FormConfiguration<TEntity>): Form<TEntity>;
}