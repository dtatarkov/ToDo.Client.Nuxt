import type { Form } from '@/modules/forms/entities/form';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { Modal } from '../entities/modal';
import { Overlay } from '../entities/overlay';
import { ModalFactory } from '../factories/modalFactory';
import type { AddFormModalUseCase } from './addFormModalUseCase';


@dependency(Overlay)
@dependency(ModalFactory)
export class AddFormModalUseCaseImpl implements AddFormModalUseCase
{
    constructor(
        private overlay: Overlay,
        private modalFactory: ModalFactory
    )
    {
    }

    execute(form: Form): Modal<Form>
    {
        const modal = this.modalFactory.createModalBase(form);
        this.overlay.addElement(modal);

        return modal;
    }
}