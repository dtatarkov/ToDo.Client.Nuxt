import type { FormViewmodel } from '@/modules/forms/interfaces/formViewmodel';
import { dependency } from '@/modules/shared/decorators/dependency';
import type { ModalConfirm } from '../entities/modalConfirm';
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

    execute(form: FormViewmodel): ModalConfirm<FormViewmodel>
    {
        const modal = this.modalFactory.createModalConfirmForm(form);
        this.overlay.addElement(modal);

        return modal;
    }
}