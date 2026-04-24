import { Overlay } from "../interfaces/internal/overlay";
import { ModalFactory } from "../interfaces/internal/modalFactory";
import type { Observable } from '~/modules/shared/interfaces/observable';
import type { Modal } from '../interfaces/modal';
import type { ModalConfirm } from '../interfaces/modalConfirm';
import type { OverlayElement } from '../interfaces/overlayElement';
import { OverlayService } from '../interfaces/overlayService';
import { Form } from '@/modules/forms/interfaces/form';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(Overlay)
@dependency(ModalFactory)
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