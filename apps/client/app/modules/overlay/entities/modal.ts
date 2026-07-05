import type { UIElement } from '@/modules/uikit/entities/uiElement';
import { OverlayElement } from "./overlayElement";
import type { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { Func } from '@packages/shared';

export type ModalConfiguration<Content extends UIElement> = {
    title: string;
    description?: string;
    content: Content;
    buttonConfirm?: Func<ButtonGeneral, [ModalButtonConfirmConfigurator]>;
    buttonCancel?: boolean;
};

export abstract class Modal<Content extends UIElement> extends OverlayElement
{
    abstract readonly title: string;
    abstract readonly description: string;
    abstract readonly content: Content;
    abstract readonly buttonConfirm: ButtonGeneral | undefined;
    abstract readonly buttonCancel: ButtonGeneral | undefined;

    abstract enable(): void;
    abstract disable(): void;
}