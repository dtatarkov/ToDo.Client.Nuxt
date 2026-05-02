import type { ModalViewmodel } from '../modalViewmodel';
import type { ModalConfirmViewmodel } from '../modalConfirmViewmodel';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';

export abstract class ModalFactory
{
    abstract createModalBase(): ModalViewmodel;
    abstract createModalAddForm(form: FormViewmodel): ModalConfirmViewmodel;
    abstract createEditFormModal(form: FormViewmodel): ModalConfirmViewmodel;
}