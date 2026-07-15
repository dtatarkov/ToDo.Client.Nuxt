import type { Color } from '@client/ui-core';
import { Button } from './button';

export abstract class ButtonGeneral extends Button
{
    abstract title: string;
    abstract color: Color;
    abstract readonly isLoading: boolean;

    abstract showLoader(): void;
    abstract hideLoader(): void;
}