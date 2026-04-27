import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalBase } from "../viewmodels/modalBase";
import { ModalConfirmForm } from '../viewmodels/modalConfirmForm';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import { ModalConfirm } from '../interfaces/modalConfirm';
import { Modal } from '../interfaces/modal';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(UIKitViewmodelsFactory)
export class ModalFactoryImpl extends ModalFactory
{
    constructor(protected uikitElementsFactory: UIKitViewmodelsFactory)
    {
        super();
    }

    createModalBase(): Modal
    {
        return new ModalBase();
    }

    createModalAddForm(form: FormViewmodel): ModalConfirm
    {
        const modal = this.createModalConfirmForm(form);
        modal.buttonConfirm.title = 'Добавить';

        return modal;
    }

    createModalEditForm(form: FormViewmodel): ModalConfirm
    {
        const modal = this.createModalConfirmForm(form);

        return modal;
    }

    private createModalConfirmForm(form: FormViewmodel)
    {
        const modal = new ModalConfirmForm(form, this.uikitElementsFactory);
        modal.init();

        return modal;
    }
}