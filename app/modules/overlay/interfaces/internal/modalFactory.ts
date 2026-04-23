import type { Modal } from '../modal';
import type { ModalConfirm } from '../modalConfirm';
import { Form } from '@forms/interfaces/form';

export abstract class ModalFactory
{
    abstract createModalBase(): Modal;
    abstract createModalAddForm(form: Form): ModalConfirm;
    abstract createModalEditForm(form: Form): ModalConfirm;
}