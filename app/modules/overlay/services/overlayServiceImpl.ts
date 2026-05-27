import { ModalFactory } from "../interfaces/internal/modalFactory";
import type { Observable } from '@/modules/shared/interfaces/observable';
import type { Modal } from '../entities/modal';
import type { ModalConfirm } from '../entities/modalConfirm';
import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import { OverlayService } from '../interfaces/overlayService';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import { Overlay } from '../entities/overlay';

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

  override addModalConfirmForm(form: FormViewmodel): ModalConfirm<FormViewmodel>
  {
    const modal = this.modalFactory.createModalConfirmForm(form);
    this.overlay.addElement(modal);

    return modal;
  }

  getElements(): Observable<OverlayElementViewmodel[]>
  {
    return this.overlay.getElements();
  }
}