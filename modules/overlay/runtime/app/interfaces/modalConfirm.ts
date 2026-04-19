import { Modal } from './modal';


export abstract class ModalConfirm extends Modal
{
    abstract buttonConfirm: UIElement;
    abstract buttonCancel: UIElement;
}
