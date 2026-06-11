import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { OverlayElement } from "./overlayElement";
import type { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { Func } from '@/modules/shared/types/func';

export type ModalConfiguration = {
    title: string;
    description?: string;
    content: UIElement;
    buttonConfirm?: Func<ButtonGeneral, [ModalButtonConfirmConfigurator]>;
    buttonCancel?: boolean;
};

export abstract class Modal extends OverlayElement
{
    abstract enable(): void;
    abstract disable(): void;
}