import { ButtonBaseViewmodel } from './buttonBaseViewmodel';
import type { ButtonGeneralData } from '../types/buttonGeneralData';
import type { Color } from '@client/ui-core';
import type { MessageKey } from '@client/infrastructure-messages';

export abstract class ButtonGeneralViewmodel extends ButtonBaseViewmodel<ButtonGeneralData>
{
    abstract setTitle(title: MessageKey | undefined): void;
    abstract setColor(color: Color): void;
    abstract showLoader(): void;
    abstract hideLoader(): void;
}
