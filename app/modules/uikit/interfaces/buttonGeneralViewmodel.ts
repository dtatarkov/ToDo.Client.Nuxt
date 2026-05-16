import type { ButtonColor } from '../types/buttonColor';
import { ButtonBaseViewmodel, type ButtonBaseViewmodelData, type ButtonBaseViewmodelHandlers } from './buttonBaseViewmodel';

export type ButtonGeneralViewmodelData = ButtonBaseViewmodelData & {
    title: string;
    isLoading: boolean;
    color: ButtonColor;
};

export type ButtonGeneralViewmodelHandlers = ButtonBaseViewmodelHandlers;

export abstract class ButtonGeneralViewmodel extends ButtonBaseViewmodel
{
    abstract title: string;
    abstract isLoading: boolean;
    abstract color: ButtonColor;
}