import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import { ModalViewmodel } from './modalViewmodel';


export abstract class ModalConfirmViewmodel extends ModalViewmodel
{
    abstract buttonConfirm: ButtonGeneralViewmodel;
    abstract buttonCancel: ButtonGeneralViewmodel;
}
