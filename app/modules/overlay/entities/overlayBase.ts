import { dependency } from '@/modules/shared/decorators/dependency';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { MessagesService } from '@/modules/shared/services/messagesService';
import { Overlay } from './overlay';
import { ModalBase } from './modalBase';
import { NotificationBase } from './notificationBase';
import { ModalsStoreBase } from './modalsStoreBase';
import { NotificationsStoreBase } from './notificationsStoreBase';
import type { OverlayElement } from './overlayElement';
import type { Modal, ModalConfiguration } from './modal';
import type { Notification } from './notification';
import type { NotificationConfiguration } from './notificationConfiguration';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

@dependency(ButtonsFactory)
@dependency(MessagesService)
export class OverlayBase extends Overlay
{
    private modalsStore = new ModalsStoreBase();
    private notificationsStore = new NotificationsStoreBase();

    constructor(
        private buttonsFactory: ButtonsFactory,
        private messagesService: MessagesService
    )
    {
        super();
    }

    getElements(): OverlayElement[]
    {
        return [
            ...this.modalsStore.getElements(),
            ...this.notificationsStore.getElements(),
        ];
    }

    onElementsChange(callback: Action<[OverlayElement[]]>, disposeToken?: DisposeToken): void
    {
        const combinedCallback = () => callback(this.getElements());

        this.modalsStore.onElementsChange(combinedCallback, disposeToken);
        this.notificationsStore.onElementsChange(combinedCallback, disposeToken);
    }

    createModal<Content extends UIElement>(configuration: ModalConfiguration<Content>): Modal<Content>
    {
        const modal = new ModalBase(
            this.buttonsFactory,
            this.messagesService,
            this.modalsStore,
            configuration);

        this.modalsStore.add(modal);

        return modal;
    }

    createNotification(configuration: NotificationConfiguration): Notification
    {
        const notification = new NotificationBase(this.notificationsStore, configuration);
        this.notificationsStore.add(notification);

        return notification;
    }

    override[Symbol.dispose](): void
    {
        this.modalsStore[Symbol.dispose]();
        this.notificationsStore[Symbol.dispose]();
    }
}