import { Form } from "../interfaces/form";
import { FormBase } from "../entities/formBase";
import { FormElementFactory } from "../interfaces/internal/formElementFactory";
import { FormFactory } from "../interfaces/formFactory";
import { dependency } from "@/modules/shared/decorators/dependency";

@dependency(FormElementFactory)
export class FormFactoryImpl implements FormFactory
{
  constructor(protected formElementFactory: FormElementFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(): Form<TEntity>
  {
    return new FormBase(this.formElementFactory);
  }
}