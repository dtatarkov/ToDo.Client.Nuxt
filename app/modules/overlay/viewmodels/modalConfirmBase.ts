import { NotInitializedException } from '@/modules/shared/exceptions/notInitializedException';
import type { ButtonViewmodelGeneral } from '@/modules/uikit/interfaces/buttonViewmodelGeneral';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ModalConfirm } from '../interfaces/modalConfirm';
import { ModalBase } from './modalBase';

enum ModalConfirmBaseState
{
    initial = 0,
    initialized = 1,
}

export class ModalConfirmBase extends ModalConfirm
{
    private _buttonConfirm: ButtonViewmodelGeneral | undefined;
    private _buttonCancel: ButtonViewmodelGeneral | undefined;

    protected modal = new ModalBase();
    protected state = ModalConfirmBaseState.initial;

    constructor(protected uikitElementsFactory: UIKitViewmodelsFactory)
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

    get content(): Viewmodel | undefined
    {
        this.assertInitialization();
        return this.modal.content;
    }

    set content(value: Viewmodel | undefined)
    {
        this.assertInitialization();
        this.modal.content = value;
    }

    get buttonConfirm(): ButtonViewmodelGeneral
    {
        this.assertInitialization();
        return this._buttonConfirm as ButtonViewmodelGeneral;
    }

    get buttonCancel(): ButtonViewmodelGeneral
    {
        this.assertInitialization();
        return this._buttonCancel as ButtonViewmodelGeneral;
    }

    get controls(): Array<Viewmodel>
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

    protected createButtonConfirm(): ButtonViewmodelGeneral
    {
        const buttonConfirm = this.uikitElementsFactory.createButtonGeneral({
            title: 'Сохранить',
            color: 'primary'
        });

        return buttonConfirm;
    }

    protected createButtonCancel(): ButtonViewmodelGeneral
    {
        const buttonCancel = this.uikitElementsFactory.createButtonGeneral({
            title: 'Отменить'
        });

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

