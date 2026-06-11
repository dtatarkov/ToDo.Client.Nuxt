import type { Color } from '../../types/color';
import { Button } from './button';

export abstract class ButtonGeneral extends Button
{
    abstract title: string;
    abstract color: Color;
    abstract readonly isLoading: boolean;

    abstract showLoader(): void;
    abstract hideLoader(): void;
}