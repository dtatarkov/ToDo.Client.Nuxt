import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalBase } from "../entities/modalBase";
import { ModalConfirmForm } from '../entities/modalConfirmForm';
import { Form } from '@/modules/forms/interfaces/form';
import { ModalConfirm } from '../interfaces/modalConfirm';
import { Modal } from '../interfaces/modal';
import { UIKitElementsFactory } from '@/modules/uikit/interfaces/uiKitElementsFactory';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(UIKitElementsFactory)
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

    createModalAddForm(form: Form): ModalConfirm
    {
        const modal = this.createModalConfirmForm(form);
        modal.buttonConfirm.title = 'Добавить';

        return modal;
    }

    createModalEditForm(form: Form): ModalConfirm
    {
        const modal = this.createModalConfirmForm(form);

        return modal;
    }

    private createModalConfirmForm(form: Form)
    {
        const modal = new ModalConfirmForm(form, this.uikitElementsFactory);
        modal.init();

        return modal;
    }
}