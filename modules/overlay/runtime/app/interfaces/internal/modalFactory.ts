export abstract class ModalFactory
{
    abstract createModalBase(): Modal;
    abstract createModalAddForm(form: Form): ModalConfirm;
    abstract createModalEditForm(form: Form): ModalConfirm;
}