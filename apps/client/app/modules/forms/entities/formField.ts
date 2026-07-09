import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ValidationError } from '@client/shared';

export abstract class FormField extends UIElement
{
  abstract name: string;
  abstract label: string;
  abstract content: UIElement | undefined;

  abstract getError(): ValidationError | undefined;
  abstract setError(error: ValidationError): void;
  abstract clearError(): void;
}