import type { OverlayElement } from './overlayElement';
import type { Modal, ModalConfiguration } from './modal';
import type { Toast } from './toast';
import type { ToastConfiguration } from './toastConfiguration';
import type { Action } from '@/modules/shared/types/action';
import type { DisposeToken } from '@/modules/shared/entities/disposeToken';
import type { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class Overlay implements Disposable
{
  abstract getElements(): OverlayElement[];
  abstract createModal<Content extends UIElement>(configuration: ModalConfiguration<Content>): Modal<Content>;
  abstract createToast(configuration: ToastConfiguration): Toast;
  abstract onElementsChange(callback: Action<[OverlayElement[]]>, disposeToken?: DisposeToken): void;
  abstract [Symbol.dispose](): void;
}