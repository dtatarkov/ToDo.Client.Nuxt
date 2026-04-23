import { Form } from "../interfaces/form";

export abstract class FormFactory
{
  abstract create<TEntity extends Record<string, any> = Record<string, any>>(): Form<TEntity>;
}