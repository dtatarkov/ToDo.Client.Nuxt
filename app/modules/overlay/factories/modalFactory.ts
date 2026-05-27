import type { Modal } from '../entities/modal';
import type { Form } from '@/modules/forms/entities/form';
import type { ModalConfirm } from '../entities/modalConfirm';
import { dependency } from '@/modules/shared/decorators/dependency';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalBase } from '../entities/modalBase';
import { ModalConfirmBase } from '../entities/modalConfirmBase';
import { ModalConfirmForm } from '../entities/modalConfirmForm';

@dependency(ButtonsFactory)
export class ModalFactory
{
    constructor(
        protected buttonsFactory: ButtonsFactory,
    )
    {
    }

    createModalBase(): Modal
    {
        return new ModalBase();
    }

    createModalConfirm(): ModalConfirm
    {
        const result = new ModalConfirmBase(this.buttonsFactory);

        return result;
    }

    createModalConfirmForm(form: Form): ModalConfirm<Form>
    {
        const result = new ModalConfirmForm(this.buttonsFactory);
        result.content = form;

        return result;
    }
}