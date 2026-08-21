import { ButtonBaseViewmodel } from './buttonBaseViewmodel';
import type { ButtonIconData } from '../types/buttonIconData';
import type { Icon } from '@client/shared';

export abstract class ButtonIconViewmodel extends ButtonBaseViewmodel<ButtonIconData>
{
    abstract setIcon(icon: Icon): void;
}
