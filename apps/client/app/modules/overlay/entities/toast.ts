import { OverlayElement } from './overlayElement';
import type { Color } from '@/modules/uikit/types/color';
import type { Icon } from '@client/shared';

export type ToastData = {
    id: string | undefined;
    title: string;
    description: string;
    icon: Icon;
    color: Color;
};

export abstract class Toast extends OverlayElement implements ToastData
{
    abstract readonly id: string | undefined;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;
    abstract readonly color: Color;
}