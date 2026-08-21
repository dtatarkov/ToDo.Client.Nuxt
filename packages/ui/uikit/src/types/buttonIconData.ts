import type { Icon } from '@client/shared';
import type { ButtonData } from './buttonData';

export type ButtonIconData = ButtonData & {
    icon?: Icon;
};
