import { Button, type ButtonData } from './button';

export type ButtonIconData = ButtonData & {
    icon: string;
};

export abstract class ButtonIcon extends Button
{
    abstract icon: string;
}