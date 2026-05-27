import type { Modal } from '../../entities/modal';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { ModalConfirm } from '../../entities/modalConfirm';

export abstract class ModalFactory
{
    abstract createModalBase(): Modal;
    abstract createModalConfirm(): ModalConfirm;
    abstract createModalConfirmForm(form: FormViewmodel): ModalConfirm<FormViewmodel>;
}