import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import { CommandState } from '@/modules/shared/enums/commandState';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import { ModalConfirmButtonConfigurator } from './modalConfirmButtonConfigurator';
import type { ModalConfigurator } from './modalConfigurator';
import type { Func } from '@/modules/shared/types/func';
import type { Modal } from './modal';


export class ModalConfirmButtonConfiguratorBase extends ModalConfirmButtonConfigurator
{
    constructor(
        private button: ButtonGeneral,
        private command: AsyncCommand,
        private modal: Modal,
        private finalize: Func<ModalConfigurator>,
    )
    {
        super();
    }

    override asCreateButton(): ModalConfigurator
    {
        return this
            .setDefaultColor()
            .setTitle('Добавить')
            .setupClickHandler()
            .setupCommand()
            .finalize();
    }

    override asEditButton(): ModalConfigurator
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
}