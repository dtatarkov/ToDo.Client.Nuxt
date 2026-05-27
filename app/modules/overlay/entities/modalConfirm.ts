import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import { Modal } from './modal';

export abstract class ModalConfirm<Content extends Viewmodel = Viewmodel> extends Modal<Content>
{
    abstract get buttonConfirm(): ButtonGeneralViewmodel;
    abstract get buttonCancel(): ButtonGeneralViewmodel;

    abstract setAddButton(): void;
    abstract setEditButton(): void;
}