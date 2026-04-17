import { OverlayService } from "../interfaces/overlayService";
import type { Overlay } from "../interfaces/overlay";
import { type OverlayElement } from "../interfaces/overlayElement";
import type { Modal } from "../interfaces/modal";

export class OverlayServiceImpl extends OverlayService
{
  constructor(protected overlay: Overlay)
  {
    super();
  }

  createModal(): Modal
  {
    const modal = this.overlay.createModal();
    return modal;
  }

  getElements(): Observable<OverlayElement[]>
  {
    return this.overlay.getElements();
  }
}