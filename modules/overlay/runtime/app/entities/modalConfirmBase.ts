import type { Overlay } from '../interfaces/internal/overlay';
import { ModalBase } from './modalBase';

export class ModalConfirmBase extends ModalConfirm
{
    protected modal = new ModalBase();

    readonly buttonConfirm: ButtonElement;
    readonly buttonCancel: ButtonElement;

    constructor(uikitElementsFactory: UIKitElementsFactory)
    {
        super();

        this.buttonConfirm = uikitElementsFactory.createButton();
        this.buttonConfirm.title = 'Сохранить';
        this.buttonConfirm.color = 'primary';

        this.buttonCancel = uikitElementsFactory.createButton();
        this.buttonCancel.title = 'Отменить';

        // Add buttons to modal controls
        this.modal.controls.push(this.buttonCancel, this.buttonConfirm);
    }

    // Delegated properties to modal
    get title(): string
    {
        return this.modal.title;
    }

    set title(value: string)
    {
        this.modal.title = value;
    }

    get description(): string
    {
        return this.modal.description;
    }

    set description(value: string)
    {
        this.modal.description = value;
    }

    get content(): UIElement | undefined
    {
        return this.modal.content;
    }

    set content(value: UIElement | undefined)
    {
        this.modal.content = value;
    }

    get controls(): Array<UIElement>
    {
        return this.modal.controls;
    }

    get parent(): Overlay | undefined
    {
        return this.modal.parent;
    }

    set parent(value: Overlay | undefined)
    {
        this.modal.parent = value;
    }

    get key(): string
    {
        return this.modal.key;
    }

    get component()
    {
        return this.modal.component;
    }

    close(): void
    {
        this.modal.close();
    }
}