import type { ButtonElementColor } from '../types/buttonElementColor';
import { ButtonElementBase, type ButtonElementBaseData } from './buttonElementBase';

export type ButtonElementGeneralData = ButtonElementBaseData & {
    title: string;
    isLoading: boolean;
    color: ButtonElementColor;
};

export abstract class ButtonElementGeneral extends ButtonElementBase
{
    abstract title: string;
    abstract isLoading: boolean;
    abstract color: ButtonElementColor;
}