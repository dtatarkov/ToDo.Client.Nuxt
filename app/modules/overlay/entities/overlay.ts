import type { OverlayElement } from './overlayElement';
import type { Modal, ModalConfiguration } from './modal';

export abstract class Overlay
{
  abstract getElements(): OverlayElement[];
  abstract createModal(configuration: ModalConfiguration): Modal;
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
}