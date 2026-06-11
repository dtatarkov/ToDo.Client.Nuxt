import type { ButtonGeneral } from '@/modules/uikit/entities/buttons/buttonGeneral';
import { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import type { AsyncCommand } from '@/modules/shared/entities/asyncCommand';


export class ModalButtonConfirmConfiguratorBase extends ModalButtonConfirmConfigurator
{
    constructor(
        private button: ButtonGeneral,
    )
    {
        super();
    }

    override withCommand(command: AsyncCommand): ModalButtonConfirmConfigurator
    {
        this.button.setCommand(command);

        return this;
    }

    override asCreateButton(): ButtonGeneral
    {
        this
            .setDefaultColor()
            .setTitle('Добавить');

        return this.button;
    }

    override asEditButton(): ButtonGeneral
    {
        this
            .setDefaultColor()
            .setTitle('Сохранить');

        return this.button;
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
}