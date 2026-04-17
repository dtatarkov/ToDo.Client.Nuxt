import { FormFieldBase } from "../entities/formFieldBase";
import type { FormElementCreateDataWithName } from "../types/formElementCreateDataWithName";
import { FormElement } from "../interfaces/formElement";
import { getUniqueId } from "@@/modules/shared/runtime/app/utils/getUniqueId";

export class FormElementBase<V = any> extends FormElement
{
  readonly key = getUniqueId('form-element');

  protected formField = new FormFieldBase();

  constructor(protected inputElement: InputElement<V>)
  {
    super();

    this.formField.content = inputElement;
  }

  get name()
  {
    return this.formField.name;
  }

  override get component()
  {
    return this.formField.component;
  }

  setValue(value: V): void
  {
    this.inputElement.value = value;
  }

  setData(data: FormElementCreateDataWithName): void
  {
    updatePropertiesWithData(this.formField, data);
    updatePropertiesWithData(this.inputElement, data);
  }
}