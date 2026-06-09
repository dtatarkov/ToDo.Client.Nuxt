import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { Modal } from './modal';


export abstract class ModalConfirmButtonConfigurator<Content extends UIElement = UIElement>
{
    abstract asCreateButton(): Modal<Content>;
    abstract asEditButton(): Modal<Content>;
}
