import { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ValidationError } from '@/modules/validation/entities/validationError';

export abstract class FormElement<V = any> extends UIElement
{
  abstract readonly name: string;
  abstract readonly label: string;
  abstract value: V;

  abstract disable(): void;
  abstract enable(): void;
  abstract validate(): void;
  abstract setDefaultValue(): void;
  abstract isValid(): boolean;
  abstract getError(): ValidationError | undefined;
}