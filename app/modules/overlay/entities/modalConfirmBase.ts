import { NotInitializedException } from '~/modules/shared/exceptions/notInitializedException';
import type { ButtonElement } from '~/modules/uikit/interfaces/buttonElement';
import type { UIElement } from '~/modules/uikit/interfaces/uiElement';
import type { UIKitElementsFactory } from '~/modules/uikit/interfaces/uiKitElementsFactory';
import { ModalConfirm } from '../interfaces/modalConfirm';
import { ModalBase } from './modalBase';

enum ModalConfirmBaseState
{
    initial = 0,
    initialized = 1,
}

export class ModalConfirmBase extends ModalConfirm
{
    private _buttonConfirm: ButtonElement | undefined;
    private _buttonCancel: ButtonElement | undefined;

    protected modal = new ModalBase();
    protected state = ModalConfirmBaseState.initial;

    constructor(protected uikitElementsFactory: UIKitElementsFactory)
    {
        super();
    }

    // Delegated properties to modal
    get title(): string
    {
        this.assertInitialization();
        return this.modal.title;
    }

    set title(value: string)
    {
        this.assertInitialization();
        this.modal.title = value;
    }

    get description(): string
    {
        this.assertInitialization();
        return this.modal.description;
    }

    set description(value: string)
    {
        this.assertInitialization();
        this.modal.description = value;
    }

    get content(): UIElement | undefined
    {
        this.assertInitialization();
        return this.modal.content;
    }

    set content(value: UIElement | undefined)
    {
        this.assertInitialization();
        this.modal.content = value;
    }

    get buttonConfirm(): ButtonElement
    {
        this.assertInitialization();
        return this._buttonConfirm as ButtonElement;
    }

    get buttonCancel(): ButtonElement
    {
        this.assertInitialization();
        return this._buttonCancel as ButtonElement;
    }

    get controls(): Array<UIElement>
    {
        this.assertInitialization();
        return this.modal.controls;
    }

    get key(): string
    {
        this.assertInitialization();
        return this.modal.key;
    }

    get component()
    {
        this.assertInitialization();
        return this.modal.component;
    }

    get onClose()
    {
        this.assertInitialization();
        return this.modal.onClose;
    }

    init(): void
    {
        if (this.state !== ModalConfirmBaseState.initial)
        {
            return;
        }

        this.state = ModalConfirmBaseState.initialized;

        this._buttonConfirm = this.createButtonConfirm();
        this._buttonCancel = this.createButtonCancel();

        this.modal.controls.push(this._buttonCancel, this._buttonConfirm);
    }

    close(): void
    {
        this.assertInitialization();
        this.modal.close();
        this._buttonConfirm?.destroy();
        this._buttonCancel?.destroy();
    }

    protected createButtonConfirm(): ButtonElement
    {
        const buttonConfirm = this.uikitElementsFactory.createButton();

        buttonConfirm.title = 'Сохранить';
        buttonConfirm.color = 'primary';

        return buttonConfirm;
    }

    protected createButtonCancel(): ButtonElement
    {
        const buttonCancel = this.uikitElementsFactory.createButton();
        buttonCancel.title = 'Отменить';

        buttonCancel.click.subscribe(() =>
        {
            this.close();
        });

        return buttonCancel;
    }

    private assertInitialization()
    {
        if (this.state !== ModalConfirmBaseState.initialized)
        {
            throw new NotInitializedException(this);
        }
    }
}

