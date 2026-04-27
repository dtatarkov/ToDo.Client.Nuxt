import { ButtonElementBase, type ButtonElementBaseData } from './buttonElementBase';

export type ButtonElementIconData = ButtonElementBaseData & {
    icon: string;
};

export abstract class ButtonElementIcon extends ButtonElementBase
{
    abstract icon: string;
}