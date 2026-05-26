import { ButtonsFactory } from './buttonsFactory';
import type { ButtonGeneralViewmodel, ButtonGeneralViewmodelData, ButtonGeneralViewmodelHandlers } from '../interfaces/buttonGeneralViewmodel';
import type { ButtonIconViewmodel, ButtonIconViewmodelData, ButtonIconViewmodelHandlers } from '../interfaces/buttonIconViewmodel';
import { ButtonGeneralViewmodelImpl } from '../viewmodels/buttons/buttonGeneralViewmodelImpl';
import { ButtonIconViewmodelImpl } from '../viewmodels/buttons/buttonIconViewmodelImpl';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

export class ButtonsFactoryImpl extends ButtonsFactory
{
    override createButtonGeneral(config?: Partial<ButtonGeneralViewmodelData> & Partial<ButtonGeneralViewmodelHandlers>): ButtonGeneralViewmodel
    {
        const button = new ButtonGeneralViewmodelImpl();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }

    override createButtonIcon(config?: Partial<ButtonIconViewmodelData> & Partial<ButtonIconViewmodelHandlers>): ButtonIconViewmodel
    {
        const button = new ButtonIconViewmodelImpl();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }
}