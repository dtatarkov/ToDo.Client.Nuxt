import { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class OverlayElement extends UIElement
{
  abstract close(): void;
  abstract getData(): Record<string, any>;
}