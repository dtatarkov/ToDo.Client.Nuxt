import { ButtonViewmodelBase, type ButtonViewmodelBaseData } from './buttonViewmodelBase';

export type ButtonViewmodelIconData = ButtonViewmodelBaseData & {
    icon: string;
};

export abstract class ButtonViewmodelIcon extends ButtonViewmodelBase
{
    abstract icon: string;
}