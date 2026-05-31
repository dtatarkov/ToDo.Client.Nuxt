import type { ButtonGeneral, ButtonGeneralData, ButtonGeneralHandlers } from '../entities/buttons/buttonGeneral';
import type { ButtonIcon, ButtonIconData, ButtonIconHandlers } from '../entities/buttons/buttonIcon';

export abstract class ButtonsFactory
{
    abstract createButtonGeneral(config?: Partial<ButtonGeneralData> & Partial<ButtonGeneralHandlers>): ButtonGeneral;
    abstract createButtonIcon(config?: Partial<ButtonIconData> & Partial<ButtonIconHandlers>): ButtonIcon;
}