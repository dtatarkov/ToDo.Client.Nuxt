import type { AsyncCommand } from '@packages/shared';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';

export abstract class ModalButtonConfirmConfigurator
{
    abstract withCommand(command: AsyncCommand): ModalButtonConfirmConfigurator;
    abstract asCreateButton(): ButtonGeneral;
    abstract asEditButton(): ButtonGeneral;
}
