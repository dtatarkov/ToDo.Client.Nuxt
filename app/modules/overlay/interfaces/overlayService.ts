import type { Observable } from '@/modules/shared/interfaces/observable';
import type { Modal } from './modal';
import type { ModalConfirm } from './modalConfirm';
import type { OverlayElement } from './overlayElement';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class OverlayService
{
  abstract createModalBase(): Modal;
  abstract createModalAddForm(form: FormViewmodel): ModalConfirm;
  abstract createModalEditForm(form: FormViewmodel): ModalConfirm;
  abstract getElements(): Observable<OverlayElement[]>;
}