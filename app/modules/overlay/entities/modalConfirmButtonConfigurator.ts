import type { ModalConfigurator } from './modalConfigurator';


export abstract class ModalConfirmButtonConfigurator
{
    abstract asCreateButton(): ModalConfigurator;
    abstract asEditButton(): ModalConfigurator;
}
