import type { FormElementValidationError } from './formElementValidationError';

export abstract class FormElement<V = any> implements Disposable
{
  abstract readonly name: string;
  abstract readonly label: string;
  abstract value: V;

  abstract disable(): void;
  abstract enable(): void;
  abstract validate(): void;
  abstract setDefaultValue(): void;
  abstract isValid(): boolean;
  abstract getError(): FormElementValidationError | undefined;

  abstract [Symbol.dispose](): void;
}