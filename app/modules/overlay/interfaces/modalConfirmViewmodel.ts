import type { ButtonViewmodelGeneral } from '@/modules/uikit/interfaces/buttonViewmodelGeneral';
import { ModalViewmodel } from './modalViewmodel';


export abstract class ModalConfirmViewmodel extends ModalViewmodel
{
    abstract buttonConfirm: ButtonViewmodelGeneral;
    abstract buttonCancel: ButtonViewmodelGeneral;
}
