import { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class FormField extends UIElement
{
  abstract name: string;
  abstract label: string;
  abstract content: UIElement | undefined;

  abstract toErrorMode(errorMessage: string): void;
  abstract toDefaultMode(): void;
}