import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { CommandState } from '@/modules/shared/enums/commandState';
import type { Action } from '@/modules/shared/types/action';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import type { UIElement } from '@/modules/uikit/entities/uiElement';
import type { ModalBase } from './modalBase';
import { ModalConfirmButtonConfigurator } from './modalConfirmButtonConfigurator';


export class ModalConfirmButtonConfiguratorBase<Content extends UIElement> extends ModalConfirmButtonConfigurator<Content>
{
    constructor(
        private button: ButtonGeneral,
        private command: AsyncCommand,
        private modal: ModalBase<Content>,
        private addControl: Action<[ButtonGeneral]>
    )
    {
        super();
    }

    override asCreateButton(): ModalBase<Content>
    {
        return this
            .setDefaultColor()
            .setTitle('Добавить')
            .setupClickHandler()
            .setupCommand()
            .finalize();
    }

    override asEditButton(): ModalBase<Content>
    {
        return this
            .setDefaultColor()
            .setTitle('Сохранить')
            .setupClickHandler()
            .setupCommand()
            .finalize();
    }

    private setDefaultColor(): this
    {
        this.button.color = 'primary';
        return this;
    }

    private setTitle(title: string): this
    {
        this.button.title = title;
        return this;
    }

    private setupClickHandler(): this
    {
        this.button.on({
            click: () => this.command.executeAsync()
        });
        return this;
    }

    private setupCommand(): this
    {
        this.command.on({
            stateChange: (state) =>
            {
                const isBusy = state === CommandState.busy;

                if (isBusy)
                {
                    this.modal.disable();
                    this.button.showLoader();
                }

                else
                {
                    this.modal.enable();
                    this.button.hideLoader();
                }
            },

            result: (result) =>
            {
                if (result)
                {
                    this.modal.close();
                }
            }
        });
        return this;
    }

    private finalize(): ModalBase<Content>
    {
        this.addControl(this.button);
        return this.modal;
    }
}
