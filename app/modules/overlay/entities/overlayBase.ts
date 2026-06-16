import { dependency } from '@/modules/shared/decorators/dependency';
import { removeFromArray } from '@/modules/shared/utils/removeFromArray';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { ModalBase } from './modalBase';
import { NotificationBase } from './notificationBase';
import type { OverlayElement } from './overlayElement';
import { Overlay } from './overlay';
import type { Modal, ModalConfiguration } from './modal';
import type { Notification } from './notification';
import type { NotificationConfiguration } from './notificationConfiguration';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { OverlayElementNotFoundException } from '../exceptions/overlayElementNotFoundException';
import { OverlayElementAlreadyAddedException } from '../exceptions/overlayElementAlreadyAddedException';
import { MessagesService } from '@/modules/shared/services/messagesService';

@dependency(ButtonsFactory)
@dependency(MessagesService)
export class OverlayBase extends Overlay
{
    private elements = new Array<OverlayElement>();
    private elementsChangeEvent = new EntityEvent<OverlayElement[]>();

    constructor(
        private buttonsFactory: ButtonsFactory,
        private messagesService: MessagesService
    )
    {
        super();
    }

    getElements(): OverlayElement[]
    {
        return this.elements;
    }

    onElementsChange(callback: Action<[OverlayElement[]]>, disposeToken?: DisposeToken): void
    {
        this.elementsChangeEvent.on(callback, disposeToken);
    }

    createModal<Content extends UIElement>(configuration: ModalConfiguration<Content>): Modal<Content>
    {
        const modal = new ModalBase(this.buttonsFactory, this.messagesService, configuration);
        this.addElement(modal);

        return modal;
    }

    createNotification(configuration: NotificationConfiguration): Notification
    {
        const notification = new NotificationBase(configuration);
        this.addElement(notification);

        return notification;
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
            const exception = new OverlayElementNotFoundException();
            console.error(exception.message, element);
            throw exception;
        }
    }

    private assertElementIsNotAdded(element: OverlayElement)
    {
        if (this.elements.includes(element))
        {
            const exception = new OverlayElementAlreadyAddedException();
            console.error(exception.message, element);

            throw exception;
        }
    }
}