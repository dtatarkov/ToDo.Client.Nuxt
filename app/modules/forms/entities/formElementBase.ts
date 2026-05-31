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

  protected validateFn: ((value: V) => string | undefined) | undefined;

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
    this.validateFn = data.validate;
  }

  override disable(): void
  {
    this.inputElement.disable();
  }

  override enable(): void
  {
    this.inputElement.enable();
  }

  override validate(): boolean
  {
    const errorMessage = this.validateFn?.(this.value);

    if (errorMessage)
    {
      this.inputElement.toErrorMode();
      this.formField.toErrorMode(errorMessage);
    }
    else
    {
      this.inputElement.toDefaultMode();
      this.formField.toDefaultMode();
    }

    return errorMessage == undefined;
  }
}