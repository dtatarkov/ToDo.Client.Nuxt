import { Button } from './button';
import type { Icon } from '@/modules/shared/enums/icons';

export abstract class ButtonIcon extends Button
{
    abstract icon: Icon;
}