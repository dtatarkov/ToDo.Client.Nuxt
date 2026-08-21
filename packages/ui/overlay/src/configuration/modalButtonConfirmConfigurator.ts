import type { AsyncCommand } from '@client/shared';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';

export abstract class ModalButtonConfirmConfigurator
{
    abstract withCommand(command: AsyncCommand): ModalButtonConfirmConfigurator;
    abstract asCreateButton(): ButtonGeneralViewmodel;
    abstract asEditButton(): ButtonGeneralViewmodel;
}
