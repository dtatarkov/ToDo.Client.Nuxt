import type { Observable } from '@/modules/shared/interfaces/observable';
import type { OverlayElementViewmodel } from '../overlayElementViewmodel';

export abstract class Overlay
{
  abstract getElements(): Observable<OverlayElementViewmodel[]>;

  abstract addElement(element: OverlayElementViewmodel): void;

  abstract removeElement(element: OverlayElementViewmodel): void;
}