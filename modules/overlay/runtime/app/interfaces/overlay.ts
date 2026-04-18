import type { OverlayElement } from "./overlayElement";
import type { Modal } from "../interfaces/modal";

export abstract class Overlay
{
  abstract getElements(): Observable<OverlayElement[]>;

  abstract createModal(): Modal;

  abstract removeElement(element: OverlayElement): void;
}