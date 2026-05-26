import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ModalViewmodel } from '../entities/modalViewmodel';
import type { ModalConfirmViewmodel } from '../entities/modalConfirmViewmodel';
import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class OverlayService
{
  abstract createModalBase(): ModalViewmodel;
  abstract createModalAddForm(form: FormViewmodel): ModalConfirmViewmodel;
  abstract createEditFormModal(form: FormViewmodel): ModalConfirmViewmodel;
  abstract getElements(): Observable<OverlayElementViewmodel[]>;
}