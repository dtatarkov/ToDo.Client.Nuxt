import type { ModalViewmodel } from '../../entities/modalViewmodel';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { ModalConfirm } from '../../entities/modalConfirm';

export abstract class ModalFactory
{
    abstract createModalBase(): ModalViewmodel;
    abstract createModalConfirm(): ModalConfirm;
    abstract createModalConfirmForm(form: FormViewmodel): ModalConfirm<FormViewmodel>;
}