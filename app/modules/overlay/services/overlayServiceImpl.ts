import { ModalFactory } from "../factories/modalFactory";
import type { Modal } from '../entities/modal';
import type { ModalConfirm } from '../entities/modalConfirm';
import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import { OverlayService } from './overlayService';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import { Overlay } from '../entities/overlay';
import type { Reactive } from 'vue';

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

  override createModalBase(): Modal
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

  override getElements(): Reactive<OverlayElementViewmodel[]>
  {
    return this.overlay.getElements();
  }
}