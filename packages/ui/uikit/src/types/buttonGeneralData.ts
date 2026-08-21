import type { Color } from '@client/ui-core';
import type { MessageKey } from '@client/infrastructure-messages';
import type { ButtonData } from './buttonData';

export type ButtonGeneralData = ButtonData & {
    title: MessageKey | undefined;
    color: Color;
    isLoading: boolean;
};
