import { ButtonViewmodel } from './buttonViewmodel';
import type { ButtonIconData } from '../types/buttonIconData';
import type { Icon } from '@client/shared';

export abstract class ButtonIconViewmodel extends ButtonViewmodel<ButtonIconData>
{
    abstract icon: Icon;
}
