import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Modal } from './modal';
import type { ModalConfirmButtonConfigurator } from './modalConfirmButtonConfigurator';

export abstract class ModalConfigurator
{
    abstract setTitle(title: string): ModalConfigurator;
    abstract setDescription(description: string): ModalConfigurator;
    abstract setContent(content: UIElement): ModalConfigurator;
    abstract addButtonConfirm(command: AsyncCommand): ModalConfirmButtonConfigurator;
    abstract addButtonCancel(): ModalConfigurator;
    abstract init(): Modal;
}