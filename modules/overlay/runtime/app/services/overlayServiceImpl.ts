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

  createModalBase(): Modal
  {
    const modal = this.modalFactory.createModalBase();
    modal.parent = this.overlay;

    this.overlay.addElement(modal);

    return modal;
  }

  createModalAdd(): ModalConfirm
  {
    const modal = this.modalFactory.createModalAdd();
    modal.parent = this.overlay;

    this.overlay.addElement(modal);

    return modal;
  }

  createModalEdit(): ModalConfirm
  {
    const modal = this.modalFactory.createModalEdit();
    modal.parent = this.overlay;

    this.overlay.addElement(modal);

    return modal;
  }

  getElements(): Observable<OverlayElement[]>
  {
    return this.overlay.getElements();
  }
}