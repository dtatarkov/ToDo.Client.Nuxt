import { Overlay } from "../interfaces/internal/overlay";
import { ModalFactory } from "../interfaces/internal/modalFactory";
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ModalViewmodel } from '../interfaces/modalViewmodel';
import type { ModalConfirmViewmodel } from '../interfaces/modalConfirmViewmodel';
import type { OverlayElementViewmodel } from '../interfaces/overlayElementViewmodel';
import { OverlayService } from '../interfaces/overlayService';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
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

  createModalBase(): ModalViewmodel
  {
    const modal = this.modalFactory.createModalBase();

    this.overlay.addElement(modal);

    return modal;
  }

  createModalAddForm(form: FormViewmodel): ModalConfirmViewmodel
  {
    const modal = this.modalFactory.createModalAddForm(form);

    this.overlay.addElement(modal);

    return modal;
  }

  createEditFormModal(form: FormViewmodel): ModalConfirmViewmodel
  {
    const modal = this.modalFactory.createEditFormModal(form);

    this.overlay.addElement(modal);

    return modal;
  }

  getElements(): Observable<OverlayElementViewmodel[]>
  {
    return this.overlay.getElements();
  }
}