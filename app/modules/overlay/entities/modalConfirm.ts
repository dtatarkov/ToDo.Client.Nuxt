import { Modal } from './modal';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';

export abstract class ModalConfirm<Content extends UIElement = UIElement> extends Modal<Content>
{
    abstract toAddMode(): void;
    abstract toEditMode(): void;

    abstract setConfirmCommand(command: AsyncCommand<boolean>): void;
}