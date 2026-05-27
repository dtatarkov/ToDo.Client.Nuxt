import type { OverlayElementViewmodel } from '../entities/overlayElementViewmodel';
import type { ModalConfirm } from '../entities/modalConfirm';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { Reactive } from 'vue';

export abstract class OverlayService
{
  abstract addModalConfirmForm(form: FormViewmodel): ModalConfirm<FormViewmodel>;
  abstract getElements(): Reactive<OverlayElementViewmodel[]>;
}