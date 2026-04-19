import { Modal } from './modal';


export abstract class ModalConfirm extends Modal
{
    abstract buttonConfirm: ButtonElement;
    abstract buttonCancel: ButtonElement;
}
