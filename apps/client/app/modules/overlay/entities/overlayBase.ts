import { dependency } from '@packages/di';
import { ButtonsFactory } from '@/modules/uikit/factories/buttonsFactory';
import { MessagesService } from '@/modules/shared/services/messagesService';
import { Overlay } from './overlay';
import { ModalBase } from './modalBase';
import { ToastBase } from './toastBase';
import { ModalsStoreBase } from './modalsStoreBase';
import { ToastsStoreBase } from './toastsStoreBase';
import type { OverlayElement } from './overlayElement';
import type { Modal, ModalConfiguration } from './modal';
import type { Toast } from './toast';
import type { ToastConfiguration } from './toastConfiguration';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { Action } from '@/modules/shared/types/action';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { EntityEvent } from '@/modules/shared/entities/entityEvent';

@dependency(ButtonsFactory)
@dependency(MessagesService)
export class OverlayBase extends Overlay
{
    private modalsStore = new ModalsStoreBase();
    private notificationsStore = new ToastsStoreBase();

    private elementsChangeEvent = new EntityEvent<OverlayElement[]>({ deferred: true });

    constructor(
        private buttonsFactory: ButtonsFactory,
        private messagesService: MessagesService
    )
    {
        super();

        const combinedCallback = () => this.elementsChangeEvent.emit(this.getElements());

        this.modalsStore.onElementsChange(combinedCallback);
        this.notificationsStore.onElementsChange(combinedCallback);
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
        this.elementsChangeEvent.on(callback, disposeToken);
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

    createToast(configuration: ToastConfiguration): Toast
    {
        const notification = new ToastBase(this.notificationsStore, configuration);
        this.notificationsStore.add(notification);

        return notification;
    }

    override[Symbol.dispose](): void
    {
        this.elementsChangeEvent[Symbol.dispose]();
        this.modalsStore[Symbol.dispose]();
        this.notificationsStore[Symbol.dispose]();
    }
}