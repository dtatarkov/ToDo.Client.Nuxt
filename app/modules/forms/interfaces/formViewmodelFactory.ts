import type { FormViewmodel } from './formViewmodel';

export abstract class FormViewmodelFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(): FormViewmodel<TEntity>;
}