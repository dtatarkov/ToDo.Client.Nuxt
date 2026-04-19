export abstract class ModalFactory
{
    abstract createModal(): Modal;
    abstract createAddModal(): ModalConfirm;
    abstract createEditModal(): ModalConfirm;
}