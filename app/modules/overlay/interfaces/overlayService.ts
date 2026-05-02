import type { Observable } from '@/modules/shared/interfaces/observable';
import type { ModalViewmodel } from './modalViewmodel';
import type { ModalConfirmViewmodel } from './modalConfirmViewmodel';
import type { OverlayElementViewmodel } from './overlayElementViewmodel';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class OverlayService
{
  abstract createModalBase(): ModalViewmodel;
  abstract createModalAddForm(form: FormViewmodel): ModalConfirmViewmodel;
  abstract createModalEditForm(form: FormViewmodel): ModalConfirmViewmodel;
  abstract getElements(): Observable<OverlayElementViewmodel[]>;
}