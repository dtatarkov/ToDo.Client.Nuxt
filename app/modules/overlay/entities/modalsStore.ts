import { OverlayElementsStoreBase } from './overlayElementsStoreBase';
import type { Modal } from './modal';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class ModalsStore extends OverlayElementsStoreBase<Modal<UIElement>>
{
}