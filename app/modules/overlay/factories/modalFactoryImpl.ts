import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalViewmodelImpl } from "../entities/modalViewmodelImpl";
import { ModalConfirmFormViewmodelImpl } from '../entities/modalConfirmFormViewmodelImpl';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import type { ModalConfirmViewmodel } from '../entities/modalConfirmViewmodel';
import type { ModalViewmodel } from '../entities/modalViewmodel';
import { dependency } from '@/modules/shared/decorators/dependency';
import { AppPublicRuntimeConfig } from '@/modules/shared/interfaces/appPublicRuntimeConfig';
import { ButtonsFactory } from '@/modules/uikit/interfaces/buttonsFactory';

@dependency(ButtonsFactory)
@dependency(AppPublicRuntimeConfig)
export class ModalFactoryImpl extends ModalFactory
{
    constructor(
        protected buttonsFactory: ButtonsFactory,
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
        const modal = new ModalConfirmFormViewmodelImpl(this.buttonsFactory, this.config, form);

        return modal;
    }
}