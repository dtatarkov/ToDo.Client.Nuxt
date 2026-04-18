import { FormFactory as FormFactoryImport } from './app/interfaces/formFactory';
import { Form as FormImport } from './app/interfaces/form';

export { };

declare global {
  export type FormFactory = FormFactoryImport;
  export type Form<TEntity extends Record<string, any> = Record<string, any>> = FormImport<TEntity>;
}