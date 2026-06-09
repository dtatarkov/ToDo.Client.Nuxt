import type { Modal } from '../entities/modal';
import { dependency } from '@/modules/shared/decorators/dependency';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalBase } from '../entities/modalBase';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

@dependency(ButtonsFactory)
export class ModalFactory
{
    constructor(
        protected buttonsFactory: ButtonsFactory,
    )
    {
    }

    createModalBase<Content extends UIElement>(content?: Content): Modal<Content>
    {
        const result = new ModalBase<Content>(this.buttonsFactory);

        if (content != undefined)
        {
            result.content = content;
        }

        return result;
    }
}