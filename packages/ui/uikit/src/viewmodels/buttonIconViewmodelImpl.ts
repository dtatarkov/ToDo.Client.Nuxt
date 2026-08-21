import { ButtonBaseViewmodelImpl } from './buttonBaseViewmodelImpl';
import { ButtonIconViewmodel } from './buttonIconViewmodel';
import type { ButtonIconData } from '../types/buttonIconData';
import type { ButtonData } from '../types/buttonData';
import { Icon } from '@client/shared';

export class ButtonIconViewmodelImpl extends ButtonBaseViewmodelImpl<ButtonIconData> implements ButtonIconViewmodel
{
    protected override getInitialData(): Omit<ButtonIconData, keyof ButtonData>
    {
        return {};
    }

    setIcon(icon: Icon): void
    {
        this.state.update({ icon });
    }
}