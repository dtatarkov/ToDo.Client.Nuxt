import type { Color } from '../types/color';
import { ButtonBaseViewmodel, type ButtonBaseViewmodelData, type ButtonBaseViewmodelHandlers } from './buttonBaseViewmodel';

export type ButtonGeneralViewmodelData = ButtonBaseViewmodelData & {
    title: string;
    isLoading: boolean;
    color: Color;
};

export type ButtonGeneralViewmodelHandlers = ButtonBaseViewmodelHandlers;

export abstract class ButtonGeneralViewmodel extends ButtonBaseViewmodel
{
    abstract title: string;
    abstract isLoading: boolean;
    abstract color: Color;
}