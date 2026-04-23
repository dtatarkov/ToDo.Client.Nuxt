import type { Observable } from '@shared/interfaces/observable';
import type { OverlayElement } from '../overlayElement';

export abstract class Overlay
{
  abstract getElements(): Observable<OverlayElement[]>;

  abstract addElement(element: OverlayElement): void;

  abstract removeElement(element: OverlayElement): void;
}