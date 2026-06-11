import { dependency } from '@/modules/shared/decorators/dependency';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalBase } from './modalBase';
import type { OverlayElement } from './overlayElement';
import { Overlay } from './overlay';
import type { Modal, ModalConfiguration } from './modal';

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

    createModal(configuration: ModalConfiguration): Modal
    {
        const modal = new ModalBase(this.buttonsFactory, configuration);
        this.addElement(modal);

        return modal;
    }

    removeElement(element: OverlayElement): void
    {
        this.assertElementIsAdded(element);

        removeFromArray(this.elements, element);
    }

    private addElement(element: OverlayElement): void
    {
        this.assertElementIsNotAdded(element);

        element.setOverlay(this);

        this.elements.push(element);
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