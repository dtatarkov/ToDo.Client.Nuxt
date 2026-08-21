import { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { AsyncCommand } from '@client/shared';
import type { MessageKey } from '@client/infrastructure-messages';

export class ModalButtonConfirmConfiguratorBase extends ModalButtonConfirmConfigurator
{
    constructor(
        private button: ButtonGeneralViewmodel
    )
    {
        super();
    }

    override withCommand(command: AsyncCommand): ModalButtonConfirmConfigurator
    {
        this.button.setCommand(command);

        return this;
    }

    override asCreateButton(): ButtonGeneralViewmodel
    {
        this
            .setDefaultColor()
            .setTitle('button.create');

        return this.button;
    }

    override asEditButton(): ButtonGeneralViewmodel
    {
        this
            .setDefaultColor()
            .setTitle('button.save');

        return this.button;
    }

    private setDefaultColor(): this
    {
        this.button.setColor('primary');

        return this;
    }

    private setTitle(title: MessageKey | undefined): this
    {
        this.button.setTitle(title);

        return this;
    }
}