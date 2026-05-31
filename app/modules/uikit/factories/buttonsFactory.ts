import type { ButtonGeneral, ButtonGeneralData } from '../entities/buttons/buttonGeneral';
import type { ButtonIcon, ButtonIconData } from '../entities/buttons/buttonIcon';

export abstract class ButtonsFactory
{
    abstract createButtonGeneral(data?: Partial<ButtonGeneralData>): ButtonGeneral;
    abstract createButtonIcon(data?: Partial<ButtonIconData>): ButtonIcon;
}