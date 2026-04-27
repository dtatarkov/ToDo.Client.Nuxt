import type { Modal } from '../modal';
import type { ModalConfirm } from '../modalConfirm';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class ModalFactory
{
    abstract createModalBase(): Modal;
    abstract createModalAddForm(form: FormViewmodel): ModalConfirm;
    abstract createModalEditForm(form: FormViewmodel): ModalConfirm;
}