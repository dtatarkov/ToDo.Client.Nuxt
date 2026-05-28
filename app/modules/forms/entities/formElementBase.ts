import { FormFieldBase } from "./formFieldBase";
import { FormElement } from "./formElement";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import { updatePropertiesWithData } from "@/modules/shared/utils/updatePropertiesWithData";
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import type { FormElementCreateDataWithName } from '../types/formElementCreateDataWithName';

export class FormElementBase<V = any> extends FormElement
{
  readonly key = getUniqueId('form-element');

  protected formField = new FormFieldBase();

  constructor(protected inputElement: InputElement<V>)
  {
    super();

    this.formField.content = inputElement;
  }

  get vnode()
  {
    return this.formField.vnode;
  }

  get name()
  {
    return this.formField.name;
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