import { FormFieldBase } from "../entities/formFieldBase";
import type { FormElementCreateDataWithName } from "../types/internal/formElementCreateDataWithName";
import { FormElement } from "../interfaces/internal/formElement";

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

  get value(): V
  {
    return this.inputElement.value;
  }

  set value(value: V)
  {
    this.inputElement.value = value;
  }

  setData(data: FormElementCreateDataWithName): void
  {
    updatePropertiesWithData(this.formField, data);
    updatePropertiesWithData(this.inputElement, data);
  }

  override disable(): void
  {
    this.inputElement.disable();
  }

  override enable(): void
  {
    this.inputElement.enable();
  }
}