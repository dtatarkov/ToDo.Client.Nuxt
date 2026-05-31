import { ButtonsFactory } from './buttonsFactory';
import type { ButtonGeneral, ButtonGeneralData } from '../entities/buttons/buttonGeneral';
import type { ButtonIcon, ButtonIconData } from '../entities/buttons/buttonIcon';
import { ButtonGeneralBase } from '../entities/buttons/buttonGeneralBase';
import { ButtonIconBase } from '../entities/buttons/buttonIconBase';
import { updatePropertiesWithData } from '@/modules/shared/utils/updatePropertiesWithData';

export class ButtonsFactoryImpl extends ButtonsFactory
{
    override createButtonGeneral(data?: Partial<ButtonGeneralData>): ButtonGeneral
    {
        const button = new ButtonGeneralBase();

        if (data != undefined)
        {
            updatePropertiesWithData(button, data);
        }

        return button;
    }

    override createButtonIcon(data?: Partial<ButtonIconData>): ButtonIcon
    {
        const button = new ButtonIconBase();

        if (data != undefined)
        {
            updatePropertiesWithData(button, data);
        }

        return button;
    }
}