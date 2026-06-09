import { dependency } from '@/modules/shared/decorators/dependency';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import type { Modal } from './modal';
import { ModalBase } from './modalBase';
import type { OverlayElement } from './overlayElement';
import { Overlay } from './overlay';

@dependency(ButtonsFactory)
export class OverlayBase extends Overlay
{
    private elements = shallowReactive(new Array<OverlayElement>());

    constructor(
        private buttonsFactory: ButtonsFactory,
    )
    {
        super();
    }

    getElements(): OverlayElement[]
    {
        return this.elements;
    }

    createModal<Content extends UIElement>(content: Content): Modal<Content>
    {
        const modal = new ModalBase<Content>(this.buttonsFactory);
        modal.setContent(content);

        this.addElement(modal);

        return modal;
    }

    addElement(element: OverlayElement): void
    {
        this.assertElementIsNotAdded(element);

        element.setOverlay(this);

        this.elements.push(element);
    }

    removeElement(element: OverlayElement): void
    {
        this.assertElementIsAdded(element);

        removeFromArray(this.elements, element);
    }

    private assertElementIsAdded(element: OverlayElement)
    {
        if (!this.elements.includes(element))
        {
            const message = 'OverlayElement does not exist in Overlay';

            console.error(message, element);
            throw new Error(message);
        }
    }

    private assertElementIsNotAdded(element: OverlayElement)
    {
        if (this.elements.includes(element))
        {
            const message = 'OverlayElement already added';

            console.error(message, element);
            throw new Error(message);
        }
    }
}