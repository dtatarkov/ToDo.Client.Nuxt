import { ModalButtonConfirmConfigurator } from './modalButtonConfirmConfigurator';
import type { ButtonGeneralViewmodel } from '@client/ui-uikit';
import type { AsyncCommand } from '@client/shared';
import type { MessagesService } from '@client/infrastructure-messages';

export class ModalButtonConfirmConfiguratorBase extends ModalButtonConfirmConfigurator
{
    constructor(
        private button: ButtonGeneralViewmodel,
        private messagesService: MessagesService,
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
            .setTitle(this.messagesService.getMessage('button.create'));

        return this.button;
    }

    override asEditButton(): ButtonGeneralViewmodel
    {
        this
            .setDefaultColor()
            .setTitle(this.messagesService.getMessage('button.save'));

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