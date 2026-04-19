export abstract class ModalFactory
{
    abstract createModalBase(): Modal;
    abstract createModalAdd(): ModalConfirm;
    abstract createModalEdit(): ModalConfirm;
}