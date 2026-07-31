import type { FormFieldBase } from "./formFieldBase";
import { FormElement } from "./formElement";
import { FormElementValidationError } from './formElementValidationError';
import { DisposeToken, type ValidationError } from '@client/shared';
import type { InputElement } from '@client/ui-uikit';

export class FormElementBase<V = any> extends FormElement
{
  private validationError: FormElementValidationError | undefined;

  private isInitialValidation = true;
  private disposeToken = new DisposeToken();

  constructor(
    protected inputElement: InputElement<V>,
    protected formField: FormFieldBase,
    protected validateFn: (value: V) => ValidationError | undefined,
  )
  {
    super();

    // this.formField.content = inputElement;
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

    const error = this.validateFn?.(this.value);

    this.validationError = error
      ? new FormElementValidationError(this.name, this.label, error.message)
      : undefined;

    this.handleValidationError(this.validationError);
  }

  override isValid(): boolean
  {
    return this.validationError == undefined;
  }

  override getError(): FormElementValidationError | undefined
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

  private handleValidationError(error: FormElementValidationError | undefined): void
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