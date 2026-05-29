import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { Modal } from './modal';
import type { UIElement } from '@/modules/uikit/interfaces/uiElement';

export abstract class ModalConfirm<Content extends UIElement = UIElement> extends Modal<Content>
{
    abstract get buttonConfirm(): ButtonGeneralViewmodel;
    abstract get buttonCancel(): ButtonGeneralViewmodel;

    abstract toAddMode(): void;
    abstract toEditMode(): void;
}