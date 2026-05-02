import { ButtonBaseViewmodel, type ButtonBaseViewmodelData, type ButtonBaseViewmodelHandlers } from './buttonBaseViewmodel';

export type ButtonIconViewmodelData = ButtonBaseViewmodelData & {
    icon: string;
};

export type ButtonIconViewmodelHandlers = ButtonBaseViewmodelHandlers;

export abstract class ButtonIconViewmodel extends ButtonBaseViewmodel
{
    abstract icon: string;
}