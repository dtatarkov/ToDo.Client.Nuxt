import type { Color } from '@client/ui-core';
import type { ButtonData } from './buttonData';

export type ButtonGeneralData = ButtonData & {
    title: string;
    color: Color;
    isLoading: boolean;
};
