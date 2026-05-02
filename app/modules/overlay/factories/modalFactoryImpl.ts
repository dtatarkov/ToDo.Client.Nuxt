import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalViewmodelImpl } from "../viewmodels/modalViewmodelImpl";
import { ModalConfirmFormViewmodelImpl } from '../viewmodels/modalConfirmFormViewmodelImpl';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { ModalConfirmViewmodel } from '../interfaces/modalConfirmViewmodel';
import type { ModalViewmodel } from '../interfaces/modalViewmodel';
import { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { dependency } from '@/modules/shared/decorators/dependency';
import { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';

@dependency(UIKitViewmodelsFactory)
@dependency(AppPublicRuntimeConfig)
export class ModalFactoryImpl extends ModalFactory
{
    constructor(
        protected uikitElementsFactory: UIKitViewmodelsFactory,
        private config: AppPublicRuntimeConfig,
    )
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

    createEditFormModal(form: FormViewmodel): ModalConfirmViewmodel
    {
        const modal = this.createModalConfirmForm(form);

        return modal;
    }

    private createModalConfirmForm(form: FormViewmodel)
    {
        const modal = new ModalConfirmFormViewmodelImpl(this.uikitElementsFactory, this.config, form);

        return modal;
    }
}