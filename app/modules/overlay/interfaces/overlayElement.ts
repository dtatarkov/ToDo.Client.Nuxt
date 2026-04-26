import type { Subscribable } from '@/modules/shared/interfaces/subscribable';
import { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class OverlayElement extends UIElement<string>
{
  abstract readonly onClose: Subscribable;

  abstract close(): void;
}