import { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class FormElement<V = any> extends UIElement
{
  abstract name: string;
  abstract value: V;

  abstract disable(): void;
  abstract enable(): void;
  abstract validate(): boolean;
}