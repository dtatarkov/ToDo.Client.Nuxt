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

    this.overlay.addElement(modal);

    return modal;
  }

  createModalAddForm(form: Form): ModalConfirm
  {
    const modal = this.modalFactory.createModalAddForm(form);

    this.overlay.addElement(modal);

    return modal;
  }

  createModalEditForm(form: Form): ModalConfirm
  {
    const modal = this.modalFactory.createModalEditForm(form);

    this.overlay.addElement(modal);

    return modal;
  }

  getElements(): Observable<OverlayElement[]>
  {
    return this.overlay.getElements();
  }
}