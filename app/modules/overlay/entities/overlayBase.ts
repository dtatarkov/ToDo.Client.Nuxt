import { dependency } from '@/modules/shared/decorators/dependency';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalBase } from './modalBase';
import type { OverlayElement } from './overlayElement';
import { Overlay } from './overlay';
import type { Modal, ModalConfiguration } from './modal';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';

@dependency(ButtonsFactory)
export class OverlayBase extends Overlay
{
    private elements = new Array<OverlayElement>();
    private elementsChangeEvent = new EntityEvent<OverlayElement[]>();

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

    onElementsChange(callback: Action<[OverlayElement[]]>, disposeToken: DisposeToken): void
    {
        this.elementsChangeEvent.on(callback, disposeToken);
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
        this.elementsChangeEvent.emit(this.elements);
    }

    override[Symbol.dispose](): void
    {
        this.elementsChangeEvent[Symbol.dispose]();
    }

    private addElement(element: OverlayElement): void
    {
        this.assertElementIsNotAdded(element);

        element.setOverlay(this);

        this.elements.push(element);
        this.elementsChangeEvent.emit(this.elements);
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