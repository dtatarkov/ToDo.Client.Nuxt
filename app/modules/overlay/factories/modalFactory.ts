import type { Modal } from '../entities/modal';
import type { ModalConfirm } from '../entities/modalConfirm';
import { dependency } from '@/modules/shared/decorators/dependency';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalBase } from '../entities/modalBase';
import { ModalConfirmBase } from '../entities/modalConfirmBase';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

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

    createModalConfirm<Content extends UIElement>(content: Content): ModalConfirm<Content>
    {
        const result = new ModalConfirmBase<Content>(this.buttonsFactory);
        result.content = content;

        return result;
    }
}