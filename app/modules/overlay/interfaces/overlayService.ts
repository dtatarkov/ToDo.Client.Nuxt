import type { Observable } from '@/modules/shared/interfaces/observable';
import type { Modal } from './modal';
import type { ModalConfirm } from './modalConfirm';
import type { OverlayElement } from './overlayElement';
import { Form } from '@/modules/forms/interfaces/form';

export abstract class OverlayService
{
  abstract createModalBase(): Modal;
  abstract createModalAddForm(form: Form): ModalConfirm;
  abstract createModalEditForm(form: Form): ModalConfirm;
  abstract getElements(): Observable<OverlayElement[]>;
}