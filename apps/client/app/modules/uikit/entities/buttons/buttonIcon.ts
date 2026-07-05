import { Button } from './button';
import type { Icon } from '@packages/shared';

export abstract class ButtonIcon extends Button
{
    abstract icon: Icon;
}