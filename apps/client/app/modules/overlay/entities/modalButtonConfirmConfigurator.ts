import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';

export abstract class ModalButtonConfirmConfigurator
{
    abstract withCommand(command: AsyncCommand): ModalButtonConfirmConfigurator;
    abstract asCreateButton(): ButtonGeneral;
    abstract asEditButton(): ButtonGeneral;
}
