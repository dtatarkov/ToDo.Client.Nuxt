import type { OverlayElement } from "../interfaces/overlayElement";
import type { Modal } from "../interfaces/modal";

export abstract class OverlayService
{
  abstract createModal(): Modal;

  abstract getElements(): Observable<OverlayElement[]>;
}