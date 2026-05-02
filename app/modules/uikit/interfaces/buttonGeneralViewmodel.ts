import type { ButtonViewmodelColor } from '../types/buttonViewmodelColor';
import { ButtonBaseViewmodel, type ButtonBaseViewmodelData, type ButtonBaseViewmodelHandlers } from './buttonBaseViewmodel';

export type ButtonGeneralViewmodelData = ButtonBaseViewmodelData & {
    title: string;
    isLoading: boolean;
    color: ButtonViewmodelColor;
};

export type ButtonGeneralViewmodelHandlers = ButtonBaseViewmodelHandlers;

export abstract class ButtonGeneralViewmodel extends ButtonBaseViewmodel
{
    abstract title: string;
    abstract isLoading: boolean;
    abstract color: ButtonViewmodelColor;
}