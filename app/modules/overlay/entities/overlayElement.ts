import type { Overlay } from './overlay';
import { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class OverlayElement extends UIElement
{
  abstract close(): void;
  abstract setOverlay(overlay: Overlay): void;
}