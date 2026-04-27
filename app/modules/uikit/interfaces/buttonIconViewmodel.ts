import { ButtonBaseViewmodel, type ButtonBaseViewmodelData } from './buttonBaseViewmodel';

export type ButtonIconViewmodelData = ButtonBaseViewmodelData & {
    icon: string;
};

export abstract class ButtonIconViewmodel extends ButtonBaseViewmodel
{
    abstract icon: string;
}