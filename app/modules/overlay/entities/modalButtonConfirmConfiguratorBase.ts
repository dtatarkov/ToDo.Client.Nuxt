import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';
import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import type { ModalConfigurator } from './modalConfigurator';
import type { Func } from '@/modules/shared/types/func';
import { DisposeToken } from '@/modules/shared/entities/disposeToken';


export class ModalButtonConfirmConfiguratorBase extends ModalButtonConfirmConfigurator
{
    private disposeToken = new DisposeToken();

    constructor(
        private button: ButtonGeneral,
        private command: AsyncCommand,
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
            .setupCommand()
            .finalize();
    }

    override asEditButton(): ModalConfigurator
    {
        return this
            .setDefaultColor()
            .setTitle('Сохранить')
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

    private setupCommand(): this
    {
        this.button.setCommand(this.command);

        return this;
    }

    [Symbol.dispose](): void
    {
        this.disposeToken[Symbol.dispose]();
    }
}