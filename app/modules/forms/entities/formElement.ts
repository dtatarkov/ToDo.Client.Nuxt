import { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class FormElement<V = any> extends UIElement
{
  abstract name: string;
  abstract value: V;

  abstract disable(): void;
  abstract enable(): void;
}