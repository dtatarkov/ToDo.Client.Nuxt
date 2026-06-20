import { OverlayElement } from './overlayElement';
import type { Color } from '@/modules/uikit/types/color';
import type { Icon } from '@/modules/shared/enums/icons';

export type NotificationData = {
    id: string | undefined;
    title: string;
    description: string;
    icon: Icon;
    color: Color;
};

export abstract class Notification extends OverlayElement implements NotificationData
{
    abstract readonly id: string | undefined;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: Icon;
    abstract readonly color: Color;
}