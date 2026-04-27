import type { ButtonElementGeneral } from '@/modules/uikit/interfaces/buttonElementGeneral';
import { Modal } from './modal';


export abstract class ModalConfirm extends Modal
{
    abstract buttonConfirm: ButtonElementGeneral;
    abstract buttonCancel: ButtonElementGeneral;
}
