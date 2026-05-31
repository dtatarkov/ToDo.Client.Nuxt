import { Button, type ButtonData, type ButtonHandlers } from './button';

export type ButtonIconData = ButtonData & {
    icon: string;
};

export type ButtonIconHandlers = ButtonHandlers;

export abstract class ButtonIcon extends Button
{
    abstract icon: string;
}