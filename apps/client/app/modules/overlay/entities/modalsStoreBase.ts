import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ModalsStore } from './modalsStore';
import { OverlayElementsStoreBase } from './overlayElementsStoreBase';
import type { Modal } from './modal';

export class ModalsStoreBase extends OverlayElementsStoreBase<Modal<UIElement>> implements ModalsStore
{
}