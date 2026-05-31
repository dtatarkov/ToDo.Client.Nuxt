import { ButtonsFactory } from './buttonsFactory';
import type { ButtonGeneral, ButtonGeneralData, ButtonGeneralHandlers } from '../entities/buttons/buttonGeneral';
import type { ButtonIcon, ButtonIconData, ButtonIconHandlers } from '../entities/buttons/buttonIcon';
import { ButtonGeneralBase } from '../entities/buttons/buttonGeneralBase';
import { ButtonIconBase } from '../entities/buttons/buttonIconBase';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

export class ButtonsFactoryImpl extends ButtonsFactory
{
    override createButtonGeneral(config?: Partial<ButtonGeneralData> & Partial<ButtonGeneralHandlers>): ButtonGeneral
    {
        const button = new ButtonGeneralBase();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }

    override createButtonIcon(config?: Partial<ButtonIconData> & Partial<ButtonIconHandlers>): ButtonIcon
    {
        const button = new ButtonIconBase();

        if (config != undefined)
        {
            updatePropertiesWithData(button, config);
            button.applyHandlers(config);
        }

        return button;
    }
}