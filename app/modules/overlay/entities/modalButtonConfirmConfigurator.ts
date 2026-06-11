import type { ModalConfigurator } from './modalConfigurator';


export abstract class ModalButtonConfirmConfigurator
{
    abstract asCreateButton(): ModalConfigurator;
    abstract asEditButton(): ModalConfigurator;
}
