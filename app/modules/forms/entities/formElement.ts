import { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class FormElement<V = any> extends UIElement
{
  abstract readonly name: string;
  abstract readonly label: string;
  abstract value: V;

  abstract disable(): void;
  abstract enable(): void;
  abstract validate(): boolean;
}