import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { ModalConfirmButtonConfigurator } from './modalConfirmButtonConfigurator';
import { OverlayElement } from "./overlayElement";
import type { UIElement } from '@/modules/uikit/entities/uiElement';

export abstract class Modal<Content extends UIElement = UIElement> extends OverlayElement
{
  abstract title: string;
  abstract description: string;
  abstract content: Content | undefined;
  abstract readonly isDisabled: boolean;

  abstract addButtonConfirm(command: AsyncCommand): ModalConfirmButtonConfigurator<Content>;
  abstract addButtonCancel(): Modal<Content>;
}