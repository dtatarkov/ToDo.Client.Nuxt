import { OverlayElement } from './overlayElement';
import type { Color } from '@/modules/uikit/types/color';

export type NotificationData = {
    id: string | undefined;
    title: string;
    description: string;
    icon: string;
    color: Color;
};

export abstract class Notification extends OverlayElement implements NotificationData
{
    abstract readonly id: string | undefined;
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: string;
    abstract readonly color: Color;
}