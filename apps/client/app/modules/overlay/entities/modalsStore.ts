import type { Modal } from './modal';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { OverlayElementsStore } from './overlayElementsStore';

export abstract class ModalsStore extends OverlayElementsStore<Modal<UIElement>>
{
}