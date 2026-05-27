import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { ModalViewmodel } from './modalViewmodel';

export abstract class ModalConfirm<Content extends Viewmodel = Viewmodel> extends ModalViewmodel<Content>
{
    abstract get buttonConfirm(): ButtonGeneralViewmodel;
    abstract get buttonCancel(): ButtonGeneralViewmodel;

    abstract setAddButton(): void;
    abstract setEditButton(): void;
}