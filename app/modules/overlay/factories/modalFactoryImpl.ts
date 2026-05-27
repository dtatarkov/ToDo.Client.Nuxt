import { ModalFactory } from "../interfaces/internal/modalFactory";
import { ModalBase } from "../entities/modalBase";
import type { Modal } from '../entities/modal';
import { dependency } from '@/modules/shared/decorators/dependency';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { ModalConfirm } from '../entities/modalConfirm';
import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import { ModalConfirmForm } from '../entities/modalConfirmForm';
import { ModalConfirmBase } from '../entities/modalConfirmBase';

@dependency(ButtonsFactory)
export class ModalFactoryImpl extends ModalFactory
{
    constructor(
        protected buttonsFactory: ButtonsFactory,
    )
    {
        super();
    }

    createModalBase(): Modal
    {
        return new ModalBase();
    }

    override createModalConfirm(): ModalConfirm
    {
        const result = new ModalConfirmBase(this.buttonsFactory);

        return result;
    }

    override createModalConfirmForm(form: FormViewmodel): ModalConfirm<FormViewmodel>
    {
        const result = new ModalConfirmForm(this.buttonsFactory);
        result.content = form;

        return result;
    }
}