import { NotInitializedException } from '@/modules/shared/exceptions/notInitializedException';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { Viewmodel } from '@/modules/uikit/interfaces/viewmodel';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import { ModalConfirmViewmodel } from '../interfaces/modalConfirmViewmodel';
import { ModalViewmodelImpl } from './modalViewmodelImpl';

enum ModalConfirmBaseState
{
    initial = 0,
    initialized = 1,
}

export class ModalConfirmViewmodelImpl extends ModalConfirmViewmodel
{
    private _buttonConfirm: ButtonGeneralViewmodel | undefined;
    private _buttonCancel: ButtonGeneralViewmodel | undefined;

    protected modal = new ModalViewmodelImpl();
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

    get buttonConfirm(): ButtonGeneralViewmodel
    {
        this.assertInitialization();
        return this._buttonConfirm as ButtonGeneralViewmodel;
    }

    get buttonCancel(): ButtonGeneralViewmodel
    {
        this.assertInitialization();
        return this._buttonCancel as ButtonGeneralViewmodel;
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

    protected createButtonConfirm(): ButtonGeneralViewmodel
    {
        const buttonConfirm = this.uikitElementsFactory.createButtonGeneral({
            title: 'Сохранить',
            color: 'primary'
        });

        return buttonConfirm;
    }

    protected createButtonCancel(): ButtonGeneralViewmodel
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

