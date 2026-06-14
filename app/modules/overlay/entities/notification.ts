import { OverlayElement } from './overlayElement';
import type { Color } from '@/modules/uikit/types/color';

export abstract class Notification extends OverlayElement
{
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly icon: string;
    abstract readonly color: Color;
}