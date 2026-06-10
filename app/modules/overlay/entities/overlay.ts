import type { OverlayElement } from './overlayElement';
import type { ModalConfigurator } from './modalConfigurator';

export abstract class Overlay
{
  abstract getElements(): OverlayElement[];
  abstract createModal(): ModalConfigurator;
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
}