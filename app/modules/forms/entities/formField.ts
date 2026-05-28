import { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class FormField extends UIElement
{
  abstract name: string;
  abstract label: string;
  abstract content: UIElement | undefined;
}