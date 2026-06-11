import { ButtonsFactory } from './buttonsFactory';
import type { ButtonGeneral } from '../entities/buttons/buttonGeneral';
import type { ButtonIcon } from '../entities/buttons/buttonIcon';
import { ButtonGeneralBase } from '../entities/buttons/buttonGeneralBase';
import { ButtonIconBase } from '../entities/buttons/buttonIconBase';

export class ButtonsFactoryImpl extends ButtonsFactory
{
    override createButtonGeneral(): ButtonGeneral
    {
        const button = new ButtonGeneralBase();

        return button;
    }

    override createButtonIcon(): ButtonIcon
    {
        const button = new ButtonIconBase();

        return button;
    }
}