export abstract class Overlay
{
  abstract getElements(): Observable<OverlayElement[]>;

  abstract addElement(element: OverlayElement): void;

  abstract removeElement(element: OverlayElement): void;
}