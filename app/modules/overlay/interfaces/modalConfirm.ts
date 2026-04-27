import type { ButtonViewmodelGeneral } from '@/modules/uikit/interfaces/buttonViewmodelGeneral';
import { Modal } from './modal';


export abstract class ModalConfirm extends Modal
{
    abstract buttonConfirm: ButtonViewmodelGeneral;
    abstract buttonCancel: ButtonViewmodelGeneral;
}
