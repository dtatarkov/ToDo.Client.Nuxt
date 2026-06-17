import type { FormFieldBase } from "./formFieldBase";
import { FormElement } from "./formElement";
import { getUniqueId } from "@/modules/shared/utils/getUniqueId";
import type { InputElement } from '@/modules/forms/entities/inputElements/inputElement';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { ValidationError } from '@/modules/shared/entities/validationError';
import type { EntityFieldScheme } from '@/modules/entitySchemes/entities/EntityFieldScheme';

export class FormElementBase<V = any> extends FormElement
{
  private validationError: ValidationError | undefined;

  private isInitialValidation = true;
  private disposeToken = new DisposeToken();

  readonly key = getUniqueId('form-element');

  constructor(
    protected inputElement: InputElement<V>,
    protected formField: FormFieldBase,
    private scheme: EntityFieldScheme,
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

  get label()
  {
    return this.formField.label;
  }

  get value(): V
  {
    return this.inputElement.value;
  }

  set value(value: V)
  {
    this.disposeToken.assertNotDisposed();
    this.inputElement.value = value;
  }

  override disable(): void
  {
    this.disposeToken.assertNotDisposed();
    this.inputElement.disable();
  }

  override enable(): void
  {
    this.disposeToken.assertNotDisposed();
    this.inputElement.enable();
  }

  override setDefaultValue(): void
  {
    this.disposeToken.assertNotDisposed();
    this.inputElement.setDefaultValue();
  }

  override validate(): void
  {
    this.disposeToken.assertNotDisposed();

    if (this.isInitialValidation)
    {
      this.handleInitialValidation();
    }

    this.validationError = this.scheme.validate(this.value);
    this.handleValidationError(this.validationError);
  }

  override isValid(): boolean
  {
    return this.validationError == undefined;
  }

  override getError(): ValidationError | undefined
  {
    return this.validationError;
  }

  override[Symbol.dispose](): void
  {
    this.disposeToken[Symbol.dispose]();
  }

  private setupInputValueTracking(): void
  {
    this.inputElement.onValueChange(() => this.validate(), this.disposeToken);
  }

  private handleInitialValidation(): void
  {
    this.isInitialValidation = false;
    this.setupInputValueTracking();
  }

  private handleValidationError(error: ValidationError | undefined): void
  {
    if (error)
    {
      this.inputElement.toErrorMode();
      this.formField.setError(error);
    }
    else
    {
      this.inputElement.toDefaultMode();
      this.formField.clearError();
    }
  }
}