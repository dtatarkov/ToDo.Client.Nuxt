import type { ValidationError } from '@client/shared';
import { FormField } from "./formField";

export class FormFieldBase extends FormField
{
  private data = {
    label: '',
    name: '',
    help: <string | undefined>undefined,
  };

  private error: ValidationError | undefined = undefined;

  private children = {
    // content: <UIElement | undefined>undefined
  };

  get label(): string
  {
    return this.data.label;
  }

  set label(value: string)
  {
    this.data.label = value;
  }

  get name(): string
  {
    return this.data.name;
  }

  set name(value: string)
  {
    this.data.name = value;
  }

  // get content()
  // {
  //   return this.children.content;
  // }

  // set content(value)
  // {
  //   this.children.content = value;
  // }

  override getError(): ValidationError | undefined
  {
    return this.error;
  }

  override setError(error: ValidationError): void
  {
    this.error = error;
    this.data.help = error.message;
  }

  override clearError(): void
  {
    this.error = undefined;
    this.data.help = undefined;
  }

  override[Symbol.dispose](): void
  {

  }
}