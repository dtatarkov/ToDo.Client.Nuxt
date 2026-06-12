import type { FormFieldBase } from "./formFieldBase";
import { FormElement } from "./formElement";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import type { EntityValidator } from '@/modules/validation/entities/entityValidator';

export class FormElementBase<V = any> extends FormElement
{
  private isInitialValidation = true;

  readonly key = getUniqueId('form-element');

  constructor(
    protected inputElement: InputElement<V>,
    protected formField: FormFieldBase,
    private validator: EntityValidator,
  )
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
    if (this.isInitialValidation)
    {
      this.handleInitialValidation();
    }

    const errorMessage = this.validator.validateField(this.name, this.value);
    this.handleErrorMessage(errorMessage);

    return errorMessage == undefined;
  }

  private setupInputValueTracking(): void
  {
    this.inputElement.setValueChangeHandler(() => this.validate());
  }

  private handleInitialValidation(): void
  {
    this.isInitialValidation = false;
    this.setupInputValueTracking();
  }

  private handleErrorMessage(errorMessage: string | undefined): void
  {
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
  }
}