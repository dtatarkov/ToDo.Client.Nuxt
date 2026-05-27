import type { Observable } from '@/modules/shared/interfaces/observable';
import type { Modal } from '../entities/modal';
import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import type { ModalConfirm } from '../entities/modalConfirm';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class OverlayService
{
  abstract createModalBase(): Modal;
  abstract addModalConfirmForm(form: FormViewmodel): ModalConfirm<FormViewmodel>;
  abstract getElements(): Observable<OverlayElementViewmodel[]>;
}