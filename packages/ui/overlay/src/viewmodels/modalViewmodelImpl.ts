import { ObservableViewmodelStateBase } from '@client/ui-core';
import type { ModalData } from '../types/modalData';
import { ModalViewmodel } from './modalViewmodel';
import { OverlayElementViewmodelBase } from './overlayElementViewmodelBase';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { Viewmodel } from '@client/ui-core';
import { OverlayElementType } from '../enums/overlayElementType';

export type ModalViewmodelOptions<TContentData extends Record<string, any>> = {
    content: Viewmodel<TContentData>;
    title?: string;
    description?: string;
    buttonConfirm?: ButtonGeneralViewmodel;
    buttonCancel?: ButtonGeneralViewmodel;
    onClose?: () => void;
};

export class ModalViewmodelImpl<TContentData extends Record<string, any>>
    extends OverlayElementViewmodelBase<ModalData<TContentData>>
    implements ModalViewmodel<TContentData>
{
    override state: ObservableViewmodelStateBase<ModalData<TContentData>>;

    private content: Viewmodel<TContentData>;
    private buttonConfirm: ButtonGeneralViewmodel | undefined;
    private buttonCancel: ButtonGeneralViewmodel | undefined;

    constructor(
        options: ModalViewmodelOptions<TContentData>
    )
    {
        super(options.onClose);

        this.content = options.content;
        this.buttonConfirm = options.buttonConfirm;
        this.buttonCancel = options.buttonCancel;

        this.state = new ObservableViewmodelStateBase<ModalData<TContentData>>({
            elementType: OverlayElementType.modal,
            title: options.title ?? '',
            description: options.description ?? '',
            content: options.content.state.value,
            buttonConfirm: options.buttonConfirm?.state.value,
            buttonCancel: options.buttonCancel?.state.value,
            isDisabled: false,
        });

        this.disposeToken.registerDisposable(this.content);

        if (this.buttonConfirm)
        {
            this.disposeToken.registerDisposable(this.buttonConfirm);
        }

        if (this.buttonCancel)
        {
            this.disposeToken.registerDisposable(this.buttonCancel);
        }

        this.content.state.on(() => this.updateContentState(), this.disposeToken);
        this.buttonConfirm?.state.on(() => this.updateButtonConfirmState(), this.disposeToken);
        this.buttonCancel?.state.on(() => this.updateButtonCancelState(), this.disposeToken);
    }

    enable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.state.update({ isDisabled: false });

        this.buttonConfirm?.enable();
        this.buttonCancel?.enable();
    }

    disable(): void
    {
        this.disposeToken.assertNotDisposed();
        this.state.update({ isDisabled: true });

        this.buttonConfirm?.disable();
        this.buttonCancel?.disable();
    }

    private updateContentState()
    {
        this.state.update({ content: this.content.state.value });
    }

    private updateButtonConfirmState()
    {
        this.state.update({ buttonConfirm: this.buttonConfirm?.state.value });
    }

    private updateButtonCancelState()
    {
        this.state.update({ buttonCancel: this.buttonCancel?.state.value });
    }
}