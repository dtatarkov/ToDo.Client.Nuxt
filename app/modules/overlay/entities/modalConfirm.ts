import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import { Modal } from './modal';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';

export abstract class ModalConfirm<Content extends UIElement = UIElement> extends Modal<Content>
{
    abstract get buttonConfirm(): ButtonGeneral;
    abstract get buttonCancel(): ButtonGeneral;

    abstract toAddMode(): void;
    abstract toEditMode(): void;

    abstract setConfirmCommand(command: AsyncCommand<boolean>): void;
}