import { ToDoStateBase } from './todoStateBase';
import type { ToDoData } from '../types/todoData';
import type { ToDoBase } from './todoBase';
import type { Modal } from '@/modules/overlay/entities/modal';
import type { FormFactory } from '@/modules/forms/factories/formFactory';
import type { Overlay } from '@/modules/overlay/entities/overlay';
import type { Form } from '@/modules/forms/entities/form';
import { Icon } from '@client/shared';
import type { AppNotificationsStore } from '@/modules/notifications/entities/appNotificationsStore';
import { NotificationType } from '@/modules/notifications/types/notificationType';
import type { MessagesService } from '@client/infrastructure-messages';

export class ToDoStateNew extends ToDoStateBase
{
    constructor(
        private overlay: Overlay,
        private notificationsStore: AppNotificationsStore,
        private formFactory: FormFactory,
        messagesService: MessagesService,
        todo: ToDoBase,
    )
    {
        super(todo, messagesService);
    }

    showForm(): Modal<Form>
    {
        const form = this.formFactory.create<ToDoData>(
            {
                elements: this.scheme.getFormElementsData(),

                submit: data => this.todo
                    .setData(data)
                    .saveAsync()
            });

        form.setData(this.todo.getData());

        form.onValidationError(error =>
        {
            this.notificationsStore.addNotification({
                groupId: 'todo-create-error',
                date: new Date(),
                title: this.messagesService.getMessage('todo.notification.createError.title'),
                description: error.toString(),
                icon: Icon.exclamationTriangle,
                type: NotificationType.Error,
            });
        });

        return this.overlay.createModal({
            title: this.messagesService.getMessage('todo.modal.create.title'),
            content: form,

            buttonConfirm: configurator => configurator
                .withCommand(form.getSubmitCommand())
                .asCreateButton(),

            buttonCancel: true,
        });
    }
}