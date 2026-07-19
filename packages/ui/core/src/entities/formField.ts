import type { ValidationError } from '@client/shared';

export abstract class FormField implements Disposable
{
  abstract name: string;
  abstract label: string;
  // abstract content: UIElement | undefined;

  abstract getError(): ValidationError | undefined;
  abstract setError(error: ValidationError): void;
  abstract clearError(): void;

  abstract [Symbol.dispose](): void;
}