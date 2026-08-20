import { ButtonViewmodel } from './buttonViewmodel';
import type { ButtonGeneralData } from '../types/buttonGeneralData';
import type { Color } from '@client/ui-core';

export abstract class ButtonGeneralViewmodel extends ButtonViewmodel<ButtonGeneralData>
{
    abstract readonly isLoading: boolean;
    abstract title: string;
    abstract color: Color;

    abstract showLoader(): void;
    abstract hideLoader(): void;
}
