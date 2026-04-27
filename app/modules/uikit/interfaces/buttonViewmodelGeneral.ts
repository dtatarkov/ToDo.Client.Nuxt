import type { ButtonViewmodelColor } from '../types/buttonViewmodelColor';
import { ButtonViewmodelBase, type ButtonViewmodelBaseData } from './buttonViewmodelBase';

export type ButtonElementGeneralData = ButtonViewmodelBaseData & {
    title: string;
    isLoading: boolean;
    color: ButtonViewmodelColor;
};

export abstract class ButtonViewmodelGeneral extends ButtonViewmodelBase
{
    abstract title: string;
    abstract isLoading: boolean;
    abstract color: ButtonViewmodelColor;
}