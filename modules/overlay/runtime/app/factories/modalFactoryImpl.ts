import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalBase } from "../entities/modalBase";
import { ModalConfirmBase } from "../entities/modalConfirmBase";

export class ModalFactoryImpl extends ModalFactory
{
    constructor(protected uikitElementsFactory: UIKitElementsFactory)
    {
        super();
    }

    createModalBase(): Modal
    {
        return new ModalBase();
    }

    createModalAdd(): ModalConfirm
    {
        const modal = new ModalConfirmBase(this.uikitElementsFactory);
        modal.buttonConfirm.title = 'Добавить';

        return modal;
    }

    createModalEdit(): ModalConfirm
    {
        return new ModalConfirmBase(this.uikitElementsFactory);
    }
}