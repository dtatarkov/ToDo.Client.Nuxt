import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';
import type { ButtonIcon } from '../entities/buttons/buttonIcon';

export abstract class ButtonsFactory
{
    abstract createButtonGeneral(): ButtonGeneral;
    abstract createButtonIcon(): ButtonIcon;
}