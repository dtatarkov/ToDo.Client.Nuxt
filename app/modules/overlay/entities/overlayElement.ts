import type { Overlay } from './overlay';
import { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class OverlayElement extends UIElement
{
  abstract close(): void;
  abstract setOverlay(overlay: Overlay): void;
}