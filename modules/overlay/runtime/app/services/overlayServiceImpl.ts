import { OverlayService } from "../interfaces/overlayService";
import type { Overlay } from "../interfaces/internal/overlay";
import { ModalFactory } from "../interfaces/internal/modalFactory";

export class OverlayServiceImpl extends OverlayService
{
  constructor(
    protected overlay: Overlay,
    protected modalFactory: ModalFactory,
  )
  {
    super();
  }

  createModal(): Modal
  {
    const modal = this.modalFactory.createModal();
    modal.parent = this.overlay;

    this.overlay.addElement(modal);

    return modal;
  }

  createAddModal(): ModalConfirm
  {
    const modal = this.modalFactory.createAddModal();
    modal.parent = this.overlay;

    this.overlay.addElement(modal);

    return modal;
  }

  createEditModal(): ModalConfirm
  {
    const modal = this.modalFactory.createEditModal();
    modal.parent = this.overlay;

    this.overlay.addElement(modal);

    return modal;
  }

  getElements(): Observable<OverlayElement[]>
  {
    return this.overlay.getElements();
  }
}