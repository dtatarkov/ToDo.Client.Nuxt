import type { ButtonGeneralViewmodel, ButtonGeneralViewmodelData, ButtonGeneralViewmodelHandlers } from '../interfaces/buttonGeneralViewmodel';
import type { ButtonIconViewmodel, ButtonIconViewmodelData, ButtonIconViewmodelHandlers } from '../interfaces/buttonIconViewmodel';

export abstract class ButtonsFactory
{
    abstract createButtonGeneral(config?: Partial<ButtonGeneralViewmodelData> & Partial<ButtonGeneralViewmodelHandlers>): ButtonGeneralViewmodel;
    abstract createButtonIcon(config?: Partial<ButtonIconViewmodelData> & Partial<ButtonIconViewmodelHandlers>): ButtonIconViewmodel;
}