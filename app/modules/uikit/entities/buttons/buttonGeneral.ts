import type { Color } from '../../types/color';
import { Button, type ButtonData } from './button';

export type ButtonGeneralData = ButtonData & {
    title: string;
    isLoading: boolean;
    color: Color;
};

export abstract class ButtonGeneral extends Button
{
    abstract title: string;
    abstract isLoading: boolean;
    abstract color: Color;
}