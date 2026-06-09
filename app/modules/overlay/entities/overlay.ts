import type { OverlayElement } from './overlayElement';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Modal } from './modal';

export abstract class Overlay
{
  abstract getElements(): OverlayElement[];
  abstract createModal<Content extends UIElement>(content: Content): Modal<Content>;
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
}