import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalViewmodelImpl } from "../viewmodels/modalViewmodelImpl";
import { ModalConfirmFormViewmodelImpl } from '../viewmodels/modalConfirmFormViewmodelImpl';
import { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import { ModalConfirmViewmodel } from '../interfaces/modalConfirmViewmodel';
import { ModalViewmodel } from '../interfaces/modalViewmodel';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { dependency } from '@/modules/shared/decorators/dependency';

@dependency(UIKitViewmodelsFactory)
export class ModalFactoryImpl extends ModalFactory
{
    constructor(protected uikitElementsFactory: UIKitViewmodelsFactory)
    {
        super();
    }

    createModalBase(): ModalViewmodel
    {
        return new ModalViewmodelImpl();
    }

    createModalAddForm(form: FormViewmodel): ModalConfirmViewmodel
    {
        const modal = this.createModalConfirmForm(form);
        modal.buttonConfirm.title = 'Добавить';

        return modal;
    }

    createModalEditForm(form: FormViewmodel): ModalConfirmViewmodel
    {
        const modal = this.createModalConfirmForm(form);

        return modal;
    }

    private createModalConfirmForm(form: FormViewmodel)
    {
        const modal = new ModalConfirmFormViewmodelImpl(form, this.uikitElementsFactory);
        modal.init();

        return modal;
    }
}