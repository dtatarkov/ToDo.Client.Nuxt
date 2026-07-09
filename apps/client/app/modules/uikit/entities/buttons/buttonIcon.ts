import { Button } from './button';
import type { Icon } from '@client/shared';

export abstract class ButtonIcon extends Button
{
    abstract icon: Icon;
}