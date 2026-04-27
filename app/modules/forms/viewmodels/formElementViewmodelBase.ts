import { FormFieldBase } from "./formFieldBase";
import type { FormElementViewmodelCreateDataWithName } from "../types/formElementViewmodelCreateDataWithName";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { InputViewmodel } from "@/modules/uikit/interfaces/inputViewmodel";
import { updatePropertiesWithData } from "@/modules/shared/utils/updatePropertiesWithData";
import { FormElementViewmodel } from '../interfaces/formElementViewmodel';

export class FormElementViewmodelBase<V = any> extends FormElementViewmodel
{
  readonly key = getUniqueId('form-element');

  protected formField = new FormFieldBase();

  constructor(protected inputElement: InputViewmodel<V>)
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

  setData(data: FormElementViewmodelCreateDataWithName): void
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